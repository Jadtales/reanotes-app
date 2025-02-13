import {ReactElement} from "react";

export default function DataLoader({width}: {width: string}): ReactElement<HTMLDivElement> {

    return <div className="pageLoader"
                style={{
                    height: '40vh',
                    width: `${width}`,
                    backgroundColor: 'var(--darkThemeBody)',
                    borderRadius: '10px'
                    }}>

        <span style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: '3rem',
            letterSpacing: '10px',
            animation: 'ease',
            color: 'var(--textColor_gray_dark)'
        }}>
            Reanotes
        </span>
    </div>
}