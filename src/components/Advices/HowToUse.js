import React from 'react';

const Instrukcja = () => {
    return(
        <div className="instrukcja">
            <h1 className="innerHeaders">Instrukcja tworzenia projektu</h1>
            <ol className="listaIntrukcji">
            <li> Przy wykonywaniu pomiaru bądź dokładny - błąd wielkości 1mm to wbrew pozorom nie jest mało. Przy projektowaniu posługujemy się wyłącznie milimetrami! </li>
            <li> Wpisz szerokość kuchni w miejscu, gdzie ma znajdować się blat na jego wysokości (standardowo 900mm od powierzchni podlogi). Jeśli ściany nie są proste, prodaj NAJMNIEJSZĄ otrzymaną wartość. Jest to kluczowy wymiar, w razie potrzeby powtórz pomiar kilkukrotnie, aby wykluczyć błędy pomiarowe.</li>
            <li> Po naciśnięciu przycisku ENTER pod wizualizacją kuchni w sekcji "Wymiary formatek do zamówienia" pojawi się pierwszy element - blat. Jego szerokość będzie mniejsza o 3 mm niż zmieżona przez Ciebie szerokość kuchni. Wynika to z konieczności wprowadzenie luzu pozawalajacego na komfortoway montaż blatu. Nie przejmuj się - powstała w ten sposób szpara zniknie pod płytkami/lacobelem, którzych grubość  z klejem wynosi co najmniej 6 mm na stronę. </li>
            <li> </li>
            <li> </li>

            </ol>

        </div>
    )
}

export default Instrukcja;
