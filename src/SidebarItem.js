import React from 'react';

 // SidebarItem component represents a clickable item in the sidebar.
 // It highlights itself when active.

function SidebarItem(props) {
  // Determine the CSS class based on active state
  const className = props.active ? 'sidebar-item active' : 'sidebar-item';

  return (
    // Button element with click handler and dynamic class
    <button className={className} onClick={props.handleClick}>
      {props.name}
    </button>
  );
}

export default SidebarItem;
