// Copyright 2015 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

(function(internal, scope) {

  // TODO: CSSSimpleLength(simpleLength), CSSSimpleLength(cssString)
  function CSSSimpleLength(value, type) {
    if (value instanceof CSSSimpleLength && arguments.length == 1) {
      return new CSSSimpleLength(value.value, value.type);
    }
    if (typeof value != 'number') {
      throw new TypeError('Value of CSSSimpleLength must be a number.');
    }
    if (!CSSLengthValue.isValidLengthType(type)) {
      throw new TypeError('\'' + type + '\' is not a valid type for a CSSSimpleLength.');
    }
    this.type = type;
    this.value = value;
    this.cssString = this._generateCssString();
  }
  internal.inherit(CSSSimpleLength, CSSLengthValue);

  CSSSimpleLength.prototype.multiply = function(multiplier) {
    return new CSSSimpleLength((this.value * multiplier), this.type);
  };

  CSSSimpleLength.prototype.divide = function(divider) {
    return new CSSSimpleLength((this.value / divider), this.type);
  };

  CSSSimpleLength.prototype._addSimpleLengths = function(addedLength) {
    if (!(addedLength instanceof CSSSimpleLength)) {
      throw new TypeError('Argument must be a CSSSimpleLength');
    }
    if (this.type != addedLength.type) {
      throw new TypeError('CSSSimpleLength units are not the same');
    }
    return new CSSSimpleLength((this.value + addedLength.value), this.type);
  };

  CSSSimpleLength.prototype._subtractSimpleLengths = function(subtractedLength) {
    if (!(subtractedLength instanceof CSSSimpleLength)) {
      throw new TypeError('Argument must be a CSSSimpleLength');
    }
    if (this.type != subtractedLength.type) {
      throw new TypeError('CSSSimpleLength units are not the same');
    }
    return new CSSSimpleLength((this.value - subtractedLength.value), this.type);
  };

  CSSSimpleLength.prototype._asCalcLength = function() {
    var calcDictionary = {};
    calcDictionary[this.type] = this.value;
    return new CSSCalcLength(calcDictionary);
  };

  CSSSimpleLength.prototype.equals = function(other) {
    if (!(other instanceof CSSSimpleLength)) {
      return false;
    }
    if (!(this.type == other.type && this.value == other.value)) {
      return false;
    }
    return true;
  };

  CSSSimpleLength.prototype._generateCssString = function() {
    var cssString = this.value +
        CSSLengthValue.cssStringTypeRepresentation(this.type);
    return cssString;
  };

  scope.CSSSimpleLength = CSSSimpleLength;

})(typedOM.internal, window);
