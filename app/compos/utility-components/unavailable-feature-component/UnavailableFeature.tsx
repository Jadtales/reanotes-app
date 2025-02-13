import {ReactNode} from "react";

export default function UnavailableFeatureComponent({ child }: { child: ReactNode }) {
    return (
        <div className={'feature-unavailable'} style={{
            position: "relative",
            cursor: "default",
            width: "100%",
            display: "flex",
        }}>
            {child}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    cursor: "default",
                    borderRadius: '4px',
                    width: "100%",
                    height: "100%",
                    border: 'var(--border_tags)',
                    background: `linear-gradient(to top, var(--darkThemeBody-darkerGray_black) 10%, transparent 900%)`,
                    pointerEvents: "none", // Allow clicks to pass through to the child
                }}
            />

            <h5 style={{
                position: "absolute",
                cursor: "default",
                display: "flex",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                alignItems: "end",
                fontSize: '12px',
                fontWeight: 'normal',
                paddingBottom: '5px',
                color: "var(--textColor_unavailble-component)",
            }}>NOT AVAILABLE YET</h5>
        </div>
    );
}
