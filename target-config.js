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

(function() {

  var scopeSrc = [
      'src/scope.js'
  ];

  var typedOMSrc = [
      'src/util.js',
      'src/css-style-value.js',
      'src/css-number-value.js',
      'src/css-keyword-value.js',
      'src/css-length-value.js',
      'src/css-simple-length.js',
      'src/css-calc-length.js',
      'src/css-position-value.js',
      'src/css-color-value.js',
      'src/css-transform-component.js',
      'src/css-matrix.js',
      'src/css-perspective.js',
      'src/css-rotation.js',
      'src/css-scale.js',
      'src/css-skew.js',
      'src/css-translation.js',
      'src/css-transform-value.js',
      'src/style-property-map-readonly.js',
      'src/style-property-map.js',
      'src/parsing.js',
      'src/property-dictionary.js'
  ];

  var typedOMTest = [
      'test/js/css-number-value.js',
      'test/js/css-keyword-value.js',
      'test/js/css-length-value.js',
      'test/js/css-simple-length.js',
      'test/js/css-position-value.js',
      'test/js/css-color-value.js',
      'test/js/css-calc-length.js',
      'test/js/css-transform-component.js',
      'test/js/css-matrix.js',
      'test/js/css-perspective.js',
      'test/js/css-rotation.js',
      'test/js/css-scale.js',
      'test/js/css-skew.js',
      'test/js/css-translation.js',
      'test/js/css-transform-value.js',
      'test/js/computed-style-property-map.js',
      'test/js/inline-style-property-map.js',
      'test/js/property-dictionary.js',
      'test/js/css-style-value.js'
  ];

  // This object specifies the source and test files for different build targets.
  var targetConfig = {
    'typed-om': {
      scopeSrc: scopeSrc,
      typedOMSrc: typedOMSrc,
      src: scopeSrc.concat(typedOMSrc),
      test: typedOMTest,
    },
  };

  if (typeof module != 'undefined') {
    module.exports = targetConfig;
  } else {
    window.typedOMTargetConfig = targetConfig;
  }
})();
