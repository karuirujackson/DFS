console.log = function() {};
const { expect } = require('chai');
const rewire = require('rewire');
const sinon = require('sinon');
console.log = sinon.spy();
const { Graph } = require('../Graph.js');

describe('`depthFirstTraversal`', function() {
  it('should accept a function that prints `vertex.data` as a `callback` and call the `callback` parameter' , function() {
    let dft;
    try {
        const moduleImport = rewire('../depthFirstTraversal.js');
      	dft = moduleImport.__get__('depthFirstTraversal');
    } catch(e) {
      expect(true, 'We encountered an error when running your code. Try checking the output for errors.').to.equal(false);
    }

    const callbackSpy = sinon.spy();

    const testGraph = new Graph(true, false);
    const v1 = testGraph.addVertex('meow');
    const v2 = testGraph.addVertex('ribbit');
    const v3 = testGraph.addVertex('blah blah');
    const v4 = testGraph.addVertex('moomoo');
    const v5 = testGraph.addVertex('booboo');
    
    testGraph.addEdge(v1, v2);
    testGraph.addEdge(v2, v3);
    testGraph.addEdge(v3, v4);
    testGraph.addEdge(v2, v4);
    testGraph.addEdge(v2, v5);

    dft(v1, callbackSpy);

    const expectedCall = [v1, v2, v3, v4, v5];
    expect(expectedCall.length === callbackSpy.callCount, 'Check that you are calling the callback parameter as the `start` vertex is visited.').to.equal(true)
    expectedCall.forEach((vertex, index) => {
      expect(vertex === callbackSpy.args[index][0], 'Check that you passed the `start` vertex as an argument to the `callback`.').to.equal(true)
    })

    const expectedTestGraphCall = ['v0.0.0', 'v1.0.0', 'v1.1.0', 'v1.1.1', 'v1.1.2', 'v1.2.0', 'v1.2.1', 'v2.0.0', 'v2.1.0', 'v2.1.1'];
    expectedTestGraphCall.forEach((vertexData, index) => {
    	expect(vertexData === console.log.args[index][0], 'Check that your callback argument prints out `vertex.data`').to.equal(true);
    })
  })
});