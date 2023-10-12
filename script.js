
//Grid container
const gridContainer = document.querySelector(".grid-container");
//Slider elements
const slider = document.querySelector("#slider");
const sliderNumber = document.querySelector("#slider-number");
sliderNumber.textContent = slider.value;
//Clear button
const clear = document.querySelector("#clear");

//Global variable to help us randomize the colors
let isRandom = false;

//Color picker buttons
const blackButton = document.querySelector("#black-button");
const multiColorButton = document.querySelector("#multi-color-button");
const eraser = document.querySelector("#eraser");
const colorPicker = document.querySelector("#color-picker");


//Function that creates the grid boxes and allows for their manipulatiion
function manipulateGrid(dim)
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

//Function that clears the grid
function clearGrid()
{
    const gridboxes = document.querySelectorAll('.grid-box');
    clear.addEventListener('click',()=>{
        //Loop through all the grid boxes and revert to background colour thus clearing it
       gridboxes.forEach( (box)=>{
            box.style.backgroundColor = '#e5e7eb';
       })
    })
}

//Function that updates the grid with the new grid size
function updateGrid(newSize)
{
   
    sliderNumber.textContent = newSize;
    //Clear the grid since there was an issue that retained colors when the grid size was changed
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    //Call the function with the neew grid size
    manipulateGrid(newSize);
    
}

/*Function that listens for input changes on the slider and calls the updategrid function with 
 the new size obtained from the slider*/
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


 //Call function that handles the slider events
 handleSliderEvents();




//Function that returns a random color code
function getRandomColor()
{
    //Letters that make up color code
    let chars = '0123456789ABCDEF';
    //Starting symbol in a color code
    let color = '#';

    //Loop through the characters 6 times(length of color code) and get random characters
    for(let i=0;i<6;i++)
    {
        color+= chars[Math.floor(Math.random()*16)];
    }

    return color;
}

//Array that stores the buttons and color picker
const buttons = [blackButton,multiColorButton,eraser,colorPicker];
//Default color is black
let currentColor = 'black';


//Functions that removes the on-click listener from the currently selected button
function handleActiveButton(activeButton)
{
    
    //Remove the on click listener of active button to allow someone to click 
    buttons.forEach((button)=>{
        if(button!==activeButton)
        {
            button.removeEventListener('click',handleColors);
            button.removeEventListener('input',handleColors);
            button.classList.remove('selected-button');
        }
        else{
            button.classList.add('selected-button');
        }
        
    })
}

//Function that changes to the relevant colour when the various buttons are clicked
function handleColors()
{
    // Current color is set to black
    blackButton.addEventListener('click',()=>{
        isRandom = false;
        currentColor = 'black';
        handleActiveButton(blackButton);
    });

    //Colorful button pressed, is random set to true meaning the colors will be ransomized
    multiColorButton.addEventListener('click',()=>{
        isRandom = true;
        handleActiveButton(multiColorButton);
    });

    //Eraser allows us to 'erase' colored pixels by selecting the background color of our grid
    eraser.addEventListener('click',()=>{
        isRandom = false;
        currentColor = '#e5e7eb';
        handleActiveButton(eraser);
    })

    //Color picker allows a user to choose whick colour they would like to draw with
    colorPicker.addEventListener('input',(e)=>{
        isRandom = false;
        currentColor = e.target.value;
        handleActiveButton(colorPicker);
    })

}


//Function that handles the functionality drawing on grid
function drawOnGrid()
{
    //Function call for the function that handles color selection
    handleColors();
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
            //If isRandom is true each tile will be a random color
            if (isRandom)
            {
                e.target.style.backgroundColor = getRandomColor();
            }
            else
            {
                e.target.style.backgroundColor = currentColor;
            }
            
        }
    });
   
}




//Call the manipulate grid function with the default size(16)
manipulateGrid(16);




