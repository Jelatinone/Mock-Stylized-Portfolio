/*
 Unit 1 Project
 Portfolio: App
 Cody Washington
*/

function createJavascriptEditor() {
  const editor = document.getElementById('js-editor');
  editor.style.visibility = 'visible';
}

function createStylesEditor() {
  const editor = document.getElementById('css-editor');
  editor.style.visibility = 'visible';
}

function createHypertextEditor() {
  const editor = document.getElementById('html-editor');
  editor.style.visibility = 'visible';
}

function typedEditor(editor, content) {
  let text = content.innerHTML.replaceAll("      ", "").trimStart();
  let index = 0;
  function writer() {
    editor.innerHTML += text.charAt(index);
    index++;
    setTimeout(writer, 50);
  }
  writer();
  editor.addEventListener('input', () => {
    content.innerHTML = editor.value;
  })  
}

document.addEventListener('DOMContentLoaded', () => {
  let editors_index = 1;
  for (const header of document.getElementsByClassName('header')) {
    const parent = header.parentElement;

    let is_dragging = false;
    let initial_x, initial_y, initial_left, initial_top;

    if(parent.style.zIndex > editors_index) {
      editors_index = editors_index;
    }     
  
    const onMouseMove = (event) => {
      if (!is_dragging) return;
  
      const delta_x = event.clientX - initial_x;
      const delta_y = event.clientY - initial_y;
  
      requestAnimationFrame(() => {
        parent.style['border-radius'] = '10px'
        parent.style.left = `${initial_left + delta_x}px`;
        parent.style.top = `${initial_top + delta_y}px`;
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
  
      const bounds = header.getBoundingClientRect();
      initial_left = bounds.left;
      initial_top = bounds.top;
  
      header.style.cursor = 'grabbing';
      parent.style.zIndex = editors_index++;
  
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  const closeButtons = document.getElementsByClassName('close');
  for (let index = 0; index < closeButtons.length; index++) {
    closeButtons[index].addEventListener('click', () => {
      const Editor = document.querySelector(`div.editor:nth-of-type(${index + 1})`);
      if (Editor) {
        Editor.style.visibility = 'hidden';
      }
    });
  }  

  const maximizeButtons = document.getElementsByClassName('maximize');
  for (let index = 0; index < maximizeButtons.length; index++) {
    maximizeButtons[index].addEventListener('click', () => {
      const Editor = document.querySelector(`div.editor:nth-of-type(${index + 1})`);
      if (Editor) {
        Editor.style.visibility = 'visible';
        Editor.style.width = '100%'
        Editor.style.height = '100%'
        Editor.style.left = '0';
        Editor.style.top = '0';
        Editor.style['border-radius'] = '0';
      }
    });
  } 

  const minimizeButtons = document.getElementsByClassName('minimize');
  for (let index = 0; index < minimizeButtons.length; index++) {
    minimizeButtons[index].addEventListener('click', () => {
      const Editor = document.querySelector(`div.editor:nth-of-type(${index + 1})`);
      if (Editor) {
        Editor.style.visibility = 'visible';
        Editor.style.width = '17px'
        Editor.style.height = '17px'
        Editor.style['border-radius'] = '10px';
      }
    });
  }

  typedEditor(
    document.querySelector('#html-editor > div:nth-child(3) > textarea:nth-child(1)'),
    document.querySelector('#viewport > div:nth-child(3)'))
  typedEditor(
    document.querySelector('#css-editor > div:nth-child(3) > textarea:nth-child(1)'),
    document.querySelector('#viewport > style:nth-child(2)'))
  typedEditor(
    document.querySelector('#js-editor > div:nth-child(3) > textarea:nth-child(1)'),
    document.querySelector('#viewport > script:nth-child(1)'))
});
