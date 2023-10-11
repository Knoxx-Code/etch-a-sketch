

const gridContainer = document.querySelector(".grid-container");
const slider = document.querySelector("#slider");
const sliderNumber = document.querySelector("#slider-number");
sliderNumber.textContent = slider.value;

const clear = document.querySelector("#clear");


function createGrid(dim)
{
    

    gridContainer.style.gridTemplateRows = `repeat(${dim},1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${dim},1fr)`;

    for(let i=0;i<dim*dim;i++)
    {
        const square = document.createElement('div');
        
        square.id = i;
        gridContainer.append(square);
    }
}

createGrid(16);

// function clearGrid()
// {
//     clear.addEventListener('click',()=>{
       
//     })
// }

function updateGrid(newSize)
{
    sliderNumber.textContent = newSize;
    createGrid(newSize);
}

function handleSliderEvents()
{
    slider.addEventListener('input',(e)=>{
        let newSize = e.target.value;
        updateGrid(newSize);
    })

    slider.addEventListener('change',(e)=>{
        let newSize = e.target.value;
        updateGrid(newSize);
    })
}


// clearGrid();
handleSliderEvents();

