
import React, { useState, useRef } from "react";
import { Popover, Overlay } from "react-bootstrap";

export default function WalletOverlayButton() {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    return (
        <div className="d-inline" ref={ref}>
            <i className="walletIcon fas fa-wallet text-info h2" onClick={handleClick} title="See wallet"></i>
            <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref.current}
                containerPadding={20}
            >
                <Popover id="popover-contained">
                    <Popover.Title as="h3">Wallet</Popover.Title>
                    <Popover.Content>
                        <strong>Address:</strong> {process.env.REACT_APP_CAR_DEALER_SIMBA_FROM}
                    </Popover.Content>
                </Popover>
            </Overlay>
        </div>
    );
}