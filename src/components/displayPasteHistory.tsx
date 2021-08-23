import { useEffect, useState } from "react";
import { PasteEntry } from "./PasteEntry";


export function DisplayPasteHistory(): JSX.Element {
    const [pastes, setPastes] = useState([])

    const getPastes = async () => {
        try {
            const response = await fetch("http://localhost:4000/paste")
            const jsonData = await response.json()

            setPastes(jsonData)

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
      getPastes();
    }, []);

    console.log(pastes[0])

    return(
        <div className="paste-history">
            <h1>Placeholder for History</h1>
            <section>
                {pastes.map((paste: any) => (
                <PasteEntry 
                    key={paste.paste_id}
                    {...paste}
                />))}
            </section>
        </div>
    );
}