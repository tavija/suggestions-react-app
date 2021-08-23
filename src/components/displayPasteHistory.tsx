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
            <h1>Previous Pastes</h1>
            <div>
                {/* slice creates shallow copy, reverse reverses it
                Question: what type can I specify for paste in map? */}
                {pastes.slice(0).reverse().map((paste:any) => (
                <PasteEntry 
                    key={paste.paste_id}
                    {...paste}
                />))}
            </div>
        </div>
    );
}