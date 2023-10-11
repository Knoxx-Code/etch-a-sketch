

const gridContainer = document.querySelector(".grid-container");
const slider = document.querySelector("#slider");
const sliderNumber = document.querySelector("#slider-number");



function createGrid(dim)
{
    

    gridContainer.style.gridTemplateRows = `repeat(${dim},1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${dim},1fr)`;

    for(let i=0;i<dim*dim;i++)
    {
        const square = document.createElement('div');
        square.style.backgroundColor = 'red';
        square.id = i;
        gridContainer.append(square);
    }
}

createGrid(16);

