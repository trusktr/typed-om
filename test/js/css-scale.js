suite('CSSScale', function() {
  test('CSSScale is a CSSScale and CSSTransformComponent', function() {
    var scale = new CSSScale(1, 2);
    assert.instanceOf(scale, CSSScale,
        'A new CSSScale should be an instance of CSSScale');
    assert.instanceOf(scale, CSSTransformComponent,
        'A new CSSScale should be an instance of CSSTransformComponent');
  });

  test('CSSScale constructor throws exception for invalid types', function() {
    assert.throws(function() {new CSSScale()});
    assert.throws(function() {new CSSScale({})});
    assert.throws(function() {new CSSScale(1)});
    assert.throws(function() {new CSSScale('1', '2')});
    assert.throws(function() {new CSSScale(3, 4, null)});
    assert.throws(function() {new CSSScale({x:1, y:2, z:4})});
  });

  test('CSSScale constructor works correctly for 2 arguments', function() {
    var scale;
    assert.doesNotThrow(function() {scale = new CSSScale(3, -1)});
    assert.strictEqual(scale.cssString, 'scale(3, -1)');
    assert.strictEqual(scale.x, 3);
    assert.strictEqual(scale.y, -1);
    assert.isNull(scale.z);
    assert.isTrue(scale.is2DComponent());

    var expectedMatrix = new CSSMatrix(3, 0, 0, -1, 0, 0);
    assert.strictEqual(scale.asMatrix().cssString, expectedMatrix.cssString);
    assert.deepEqual(scale.asMatrix(), expectedMatrix);
  });

  test('CSSScale constructor works correctly for 3 arguments', function() {
    var scale;
    assert.doesNotThrow(function() {scale = new CSSScale(3, 0.5, -4)});
    assert.strictEqual(scale.cssString, 'scale3d(3, 0.5, -4)');
    assert.strictEqual(scale.x, 3);
    assert.strictEqual(scale.y, 0.5);
    assert.strictEqual(scale.z, -4);
    assert.isFalse(scale.is2DComponent());

    var expectedMatrix = new CSSMatrix(3, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, -4, 0, 0, 0,
        0, 1);
    assert.strictEqual(scale.asMatrix().cssString, expectedMatrix.cssString);
    assert.deepEqual(scale.asMatrix(), expectedMatrix);
  });
});
