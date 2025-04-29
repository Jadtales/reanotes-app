import { ClickedEditingToolsInterface } from '../notes-creation-interfaces/editing-tools-interface';
import Image from 'next/image';
import { ReactElement, useState } from 'react';

const editingToolsIcons = [
  { name: 'bold', icon: '/icons/notesIcons/bold.svg' },
  { name: 'italic', icon: '/icons/notesIcons/italic.svg' },
  { name: 'underline', icon: '/icons/notesIcons/underline.svg' },
  { name: 'bullet', icon: '/icons/notesIcons/list-unordered.svg' },
  { name: 'ordered', icon: '/icons/notesIcons/list-ordered.svg' },
  { name: 'background', icon: '/icons/notesIcons/mark-pen-line.svg' },
];

type EditingToolsReturnType = {
  cardEditingTools: ReactElement<HTMLDivElement>;
  clickedEditingTools: ClickedEditingToolsInterface;
};

export default function useEditingTools(): EditingToolsReturnType {
  const [clickedEditingTools, setClickedEditingTools] =
    useState<ClickedEditingToolsInterface>({
      clickedButton: '',
      isClicked: false,
    });

  const handleEditingToolActivityCheck = (toolName: string) => {
    setClickedEditingTools((prevState) => ({
      clickedButton: toolName,
      isClicked:
        prevState.clickedButton === toolName ? !prevState.isClicked : true,
    }));
  };

  const cardEditingToolsUIInterface = (
    <div className='cardEditingTools'>
      {editingToolsIcons.map((tool, key) => (
        <button
          aria-label={`${tool.name}`}
          type='button'
          key={key}
          onClick={() => handleEditingToolActivityCheck(tool.name)}
          onMouseDown={(e) => e.preventDefault()}
        >
          <Image src={tool.icon} alt={tool.name} width={25} height={25} />
        </button>
      ))}
    </div>
  );

  return {
    cardEditingTools: cardEditingToolsUIInterface,
    clickedEditingTools,
  };
}
