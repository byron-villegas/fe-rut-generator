import React from 'react';
import './Main.css';

function Main() {
    const [ruts, setRuts] = React.useState([]);
    const [selectedRuts, setSelectedRuts] = React.useState([]);

    React.useEffect(() => {
        generateNewRuts();
    }, []);

    const clearSelections = () => {
        setSelectedRuts([]);
    }

    const generateNewRuts = () => {
        setSelectedRuts([]);
        setRuts(generateRuts());
    }

    const generateRuts = () => {
        const columns = [];

        for (let j = 0; j < 10; j++) { // Generar 10 filas
            const rutsByColumn = [];
            for (let i = 1000000; i <= 100000000; i += 10000000) { // Generar 10 RUTs por fila
                const randomRut = generateRandomRut(i, i + 8888888).toString();
                const verificationDigit = calculateVerificationDigit(randomRut);
                const rut = formatRut(randomRut, verificationDigit);

                rutsByColumn.push(rut);
            }
            columns.push(rutsByColumn);
        }

        return columns;
    }

    const generateRandomRut = (min = 0, max = 0) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const calculateVerificationDigit = (rut = '') => {
        let sum = 0;
        let multiplier = 2;

        for (let i = rut.length - 1; i >= 0; i--) {
            sum += parseInt(rut.charAt(i)) * multiplier;
            multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }

        let remainder = sum % 11;
        let verificationDigit = 11 - remainder;

        switch (verificationDigit) {
            case 11:
                return '0';
            case 10:
                return 'K';
            default:
                return verificationDigit.toString();
        }
    }

    const formatRut = (rut = 0, verificationDigit = '') => {
        return rut + '-' + verificationDigit;
    }

    const copyRutToClipboard = (rut = '') => {

        navigator.clipboard.writeText(rut).then(() => {
            alert('Rut copiado al portapapeles: ' + rut);
        }).catch(err => {
            console.error('Error al copiar rut al portapapeles: ', err);
        });
    }

    const toggleSeleccion = (key) => {
        setSelectedRuts(prevSelectedRuts => {
            if (prevSelectedRuts.includes(key)) {
                return prevSelectedRuts.filter(selectedKey => selectedKey !== key);
            } else {
                return [...prevSelectedRuts, key];
            }
        });
    }

    return (
        <div>
            <h1 className="text-light">Listado de RUTs</h1>
            <p className="fw-light text-light">Haz click en un RUT para copiar al portapapeles</p>
            <button className="btn btn-secondary mb-3" onClick={() => clearSelections()}>Limpiar Selecciones</button>
            <button className="btn btn-primary ms-1 mb-3" onClick={() => generateNewRuts()}>Generar Nuevos RUTs</button>
            <div className="table-responsive">
                <table className="table table-bordered table-dark text-center">
                    <thead>
                        <tr>
                            <th>&#60; 10MM</th>
                            <th>10MM</th>
                            <th>20MM</th>
                            <th>30MM</th>
                            <th>40MM</th>
                            <th>50MM</th>
                            <th>60MM</th>
                            <th>70MM</th>
                            <th>80MM</th>
                            <th>90MM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ruts.map((fila, index) => (
                            <tr key={index}>
                                {fila.map((rut, id) => {
                                    const key = index + '-' + id;
                                    return (
                                        <td key={key} className={selectedRuts.includes(key) ? 'active' : ''} onClick={() => { copyRutToClipboard(rut); toggleSeleccion(key); }}>{rut}</td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Main;