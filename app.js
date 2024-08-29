/*
 Unit 1 Project
 Portfolio: App
 Cody Washington
*/

document.addEventListener('DOMContentLoaded', () => {
  const Header = document.getElementById('draggable');
  const Parent = Header.parentElement;

  let isDragging = false;
  let initial_x, initial_y, initial_left, initial_top;

  const onMouseMove = (Event) => {
    if (!isDragging) return;

    const delta_x = Event.clientX - initial_x;
    const delta_y = Event.clientY - initial_y;

    requestAnimationFrame(() => {
      Parent.style.left = `${initial_left + delta_x}px`;
      Parent.style.top = `${initial_top + delta_y}px`;
    });
  };

  Header.addEventListener('mousedown', (Event) => {
    isDragging = true;
    initial_x = Event.clientX;
    initial_y = Event.clientY;

    const rect = Header.getBoundingClientRect();
    initial_left = rect.left;
    initial_top = rect.top;

    Header.style.cursor = 'grabbing';

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  const onMouseUp = () => {
    if (!isDragging) return;

    isDragging = false;
    Header.style.cursor = 'grab';

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
});
