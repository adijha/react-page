/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import * as React from 'react';
import { DropTarget as dropTarget } from 'react-dnd';
import { connect } from '../../../reduxConnect';
import { ComponetizedRow } from '../../../types/editable';

import { dragActions } from '../../../actions/cell/drag';
import { insertActions } from '../../../actions/cell/insert';
import { target, connect as monitorConnect } from './dnd';

export type Props = ComponetizedRow & {
  children: React.ReactChildren;
  isLayoutMode: boolean;
  isInsertMode: boolean;
  isOverCurrent: boolean;
  connectDropTarget<T>(e: T): T;
};

export class Droppable extends React.Component<Props> {
  render() {
    if (!(this.props.isLayoutMode || this.props.isInsertMode)) {
      return (
        <div className="ory-row-droppable-container">{this.props.children}</div>
      );
    }

    return this.props.connectDropTarget(
      <div className="ory-row-droppable">{this.props.children}</div>
    );
  }
}

const mapDispatchToProps = { ...dragActions, ...insertActions };

export default (dropTypes: string[] = ['CELL']) =>
  connect(
    null,
    mapDispatchToProps
  )(dropTarget(dropTypes, target, monitorConnect)(Droppable));
