import {ReactElement, useState} from "react";
import Image from "next/image";


const editingToolsIcons = [
    {name: 'Bold', icon: '/icons/notesIcons/bold.svg'},
    {name: 'Italic', icon: '/icons/notesIcons/italic.svg'},
    {name: 'Underline', icon: '/icons/notesIcons/underline.svg'},
    {name: 'BulletPoints', icon: '/icons/notesIcons/list-unordered.svg'},
    {name: 'NumberedList', icon: '/icons/notesIcons/list-ordered.svg'},
    {name: 'HighlightText', icon: '/icons/notesIcons/mark-pen-line.svg'},
]

interface ClickedEditingToolsInterface {
    clickedButton: string;
    isClicked: boolean;
}

type EditingToolsReturnType = {
    cardEditingToolsUIInterface: ReactElement<HTMLDivElement>;
    clickedEditingTools: ClickedEditingToolsInterface
}

export default function useEditingTools(): EditingToolsReturnType {

    const [clickedEditingTools, setClickedEditingTools] = useState<ClickedEditingToolsInterface>({
        clickedButton: '',
        isClicked: false,
    });

    const handleEditingToolActivityCheck = (toolName: string) => {
        setClickedEditingTools((prevState) => ({
            clickedButton: toolName,
            isClicked: prevState.clickedButton === toolName ? !prevState.isClicked : true,
        }));
    };

    const cardEditingToolsUIInterface = <div className="cardEditingTools">
        <ul>
            {editingToolsIcons.map((tool, key) => (
                <li key={key} onClick={() => handleEditingToolActivityCheck(tool.name)} onMouseDown={(e) => e.preventDefault()}>
                    <Image src={tool.icon} alt={tool.name} width={25} height={25} />
                </li>
            ))}
        </ul>
    </div>
    return {
        cardEditingToolsUIInterface,
        clickedEditingTools
    }
}