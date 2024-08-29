/*
 Unit 1 Project
 Portfolio: App
 Cody Washington
*/

document.addEventListener('DOMContentLoaded', () => {
  let editors_index_z = 1;
  for (const header of document.getElementsByClassName('header')) {
    const parent = header.parentElement;

    let is_dragging = false;
    let initial_x, initial_y, initial_left, initial_top;

    if(parent.style.zIndex > editors_index_z) {
      editors_index_z = editors_index_z;
    }     
  
    const onMouseMove = (Event) => {
      if (!is_dragging) return;
  
      const delta_x = Event.clientX - initial_x;
      const delta_y = Event.clientY - initial_y;
  
      requestAnimationFrame(() => {
        parent.style.left = `${initial_left + delta_x}px`;
        parent.style.top = `${initial_top + delta_y}px`;
        parent.style.zIndex = editors_index_z++;
      });
    };

    const onMouseUp = () => {
      if (!is_dragging) return;
  
      is_dragging = false;
      header.style.cursor = 'grab';
  
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  
    header.addEventListener('mousedown', (Event) => {
      is_dragging = true;
      initial_x = Event.clientX;
      initial_y = Event.clientY;
  
      const rect = header.getBoundingClientRect();
      initial_left = rect.left;
      initial_top = rect.top;
  
      header.style.cursor = 'grabbing';
  
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
});
