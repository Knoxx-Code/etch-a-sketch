

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
        square.classList.add('grid-box');
        gridContainer.append(square);
    }

    drawOnGrid();
    clearGrid();
    
}



function clearGrid()
{
    const gridboxes = document.querySelectorAll('.grid-box');
    clear.addEventListener('click',()=>{
       gridboxes.forEach( (box)=>{
            box.style.backgroundColor = '#e5e7eb';
       })
    })
}

function updateGrid(newSize)
{
    sliderNumber.textContent = newSize;
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
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


function drawOnGrid()
{
    //Boolean that lets us handle when a user can draw
    let isDrawing = false;
    const gridboxes = document.querySelectorAll('.grid-box');
     // If mouse click is pressed down someone can draw
    gridContainer.addEventListener('mousedown',(e)=>{
        e.preventDefault();
        isDrawing = true;
    });
    //Once click is released, stop drawing
    gridContainer.addEventListener('mouseup',()=>{
        isDrawing = false;
    });

    //Check if a person moves the mouse and is holding the mouse down then enable drawing on the gridboxes
    gridContainer.addEventListener('mousemove', (e) => {
        if (isDrawing && e.target.classList.contains('grid-box')) {
            e.target.style.backgroundColor = 'black';
        }
    });
  
    
}

createGrid(16);
handleSliderEvents();



