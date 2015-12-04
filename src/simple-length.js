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

(function(shared, scope, testing) {

  // TODO: SimpleLength(simpleLength), SimpleLength(cssString)
  function SimpleLength(value, type) {
    if (arguments.length == 2 && shared.LengthValue.LengthType.indexOf(type) >= 0) {
      this.type = type;
      if (typeof value == 'number') {
        this.value = value;
      } else if (typeof value == 'string') {
        var nValue = Number.parseFloat(value);
        if (!isNaN(nValue)) {
          this.value = nValue;
        }
      }
    }
    if (this.value == undefined) {
      throw new TypeError('Value of SimpleLength must be a number or a numeric string.');
    }

    this.cssString = this.value + shared.LengthValue.cssStringTypeRepresentation(this.type);
  }

  SimpleLength.prototype = Object.create(shared.LengthValue.prototype);

  SimpleLength.prototype.multiply = function(multiplier) {
    return new SimpleLength((this.value * multiplier), this.type);
  };

  SimpleLength.prototype.divide = function(divider) {
    return new SimpleLength((this.value / divider), this.type);
  };

  SimpleLength.prototype._addSimpleLengths = function(addedLength) {
    if (!(addedLength instanceof SimpleLength)) {
      throw new TypeError('Argument must be a SimpleLength');
    }
    if (this.type != addedLength.type) {
      throw new TypeError('SimpleLength units are not the same');
    }
    return new SimpleLength((this.value + addedLength.value), this.type);
  };

  SimpleLength.prototype._subtractSimpleLengths = function(subtractedLength) {
    if (!(subtractedLength instanceof SimpleLength)) {
      throw new TypeError('Argument must be a SimpleLength');
    }
    if (this.type != subtractedLength.type) {
      throw new TypeError('SimpleLength units are not the same');
    }
    return new SimpleLength((this.value - subtractedLength.value), this.type);
  };

  SimpleLength.prototype._asCalcLength = function() {
    var calcDictionary = {};

    //Set calcDictionary field to the Length type inside the SimpleLength object that called the function
    calcDictionary[this.type] = this.value;

    return new CalcLength(calcDictionary);
  };

  SimpleLength.prototype.equals = function(other) {
    if (!(other instanceof SimpleLength)) {
      return false;
    }
    if (!(this.type == other.type && this.value == other.value)) {
      return false;
    }
    return true;
  };

  scope.SimpleLength = SimpleLength;
  if (TYPED_OM_TESTING)
    testing.SimpleLength = SimpleLength;

})(baseClasses, window, typedOMTesting);
