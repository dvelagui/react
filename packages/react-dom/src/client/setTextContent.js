/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import setInnerHTML from './setInnerHTML';
import escapeTextContentForBrowser from '../shared/escapeTextContentForBrowser';
import {TEXT_NODE} from '../shared/HTMLNodeType';

/**
 * Set the textContent property of a node, ensuring that whitespace is preserved
 * even in IE8. innerText is a poor substitute for textContent and, among many
 * issues, inserts <br> instead of the literal newline chars. innerHTML behaves
 * as it should.
 *
 * @param {DOMElement} node
 * @param {string} text
 * @internal
 */
let setTextContent = function(node, text) {
  if (text) {
    let firstChild = node.firstChild;

    if (
      firstChild &&
      firstChild === node.lastChild &&
      firstChild.nodeType === TEXT_NODE
    ) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
};

if (ExecutionEnvironment.canUseDOM) {
  if (!('textContent' in document.documentElement)) {
    setTextContent = function(node, text) {
      if (node.nodeType === TEXT_NODE) {
        node.nodeValue = text;
        return;
      }
      setInnerHTML(node, escapeTextContentForBrowser(text));
    };
  }
}

export default setTextContent;
