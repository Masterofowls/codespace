class Validator {
  string() {
    return new StringValidator();
  }

  array() {
    return new ArrayValidator();
  }

  object() {
    return new ObjectValidator();
  }
}

class StringValidator {
  constructor() {
    this.checks = [];
  }

  isValid(value) {
    if (typeof value !== 'string') return false;
    return this.checks.every((check) => check(value));
  }

  startsFromUpperCase() {
    this.checks.push((value) => /^[A-ZА-Я]/.test(value.trim()));
    return this;
  }

  length(length) {
    this.checks.push((value) => value.length === length);
    return this;
  }

  hasExclamation() {
    this.checks.push((value) => value.includes('!'));
    return this;
  }
}

class ArrayValidator {
  constructor() {
    this.maxDepthValue = null;
  }

  isValid(value) {
    if (!Array.isArray(value)) return false;
    if (this.maxDepthValue !== null) {
      return this.calculateDepth(value) <= this.maxDepthValue;
    }
    return true;
  }

  maxDepth(depth) {
    this.maxDepthValue = depth;
    return this;
  }

  calculateDepth(array, currentDepth = 0) {
    if (!Array.isArray(array)) return currentDepth;
    return Math.max(
      currentDepth,
      ...array.map((item) => this.calculateDepth(item, currentDepth + 1)),
    );
  }
}

class ObjectValidator {
  constructor() {
    this.schema = null;
  }

  shape(schema) {
    this.schema = schema;
    return this;
  }

  isValid(obj) {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return false;
    if (!this.schema) return true;

    return Object.entries(this.schema).every(([key, validator]) => obj.hasOwnProperty(key) && validator.isValid(obj[key]));
  }
}

export default Validator;
