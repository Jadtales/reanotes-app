import {ReactElement, Ref, RefObject, useRef} from "react";

interface ComponentProps{
    buttonsRef: RefObject<(HTMLButtonElement)[]>
}

export default function DifficultyProgressChoice({buttonsRef}: ComponentProps): ReactElement {


    return <div className="difficultyLearningProcess">
        <button ref={el => buttonsRef!.current[0] = el}
                className="difficultyLevel_again">Forgotten</button>
        <button ref={el => buttonsRef!.current[1] = el}
                className="difficultyLevel_hard">Unclear</button>
        <button ref={el => buttonsRef!.current[2] = el}
                className="difficultyLevel_good">Good</button>
        <button ref={el => buttonsRef!.current[3] = el}
                className="difficultyLevel_easy">Perfect</button>
    </div>
}