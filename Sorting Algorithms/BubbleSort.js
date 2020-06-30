// Type some JavaScript code here.

let arr = [9,1,8,2,3,4,5];

function bubbleSort(array)
{
    // Make a flag to check whether any elements have been swapped.
    let swapped = false;
	let temp = 0;

    // Repeat everything in this do-while loop until there is an iteration
    // where no elements have been swapped, i.e., everything is in order.
    do
    {
        // Initialise the flag to false - nothing swapped so far for this
        // iteration…
        swapped = false;

        // Run through the whole array swapping any numbers which are not
        // in order.
        for (let i = 1; i < array.length; i++)
        {
			if (array[i-1] > array[i])
			{
				temp = array[i-1];
				array [i-1] = array[i];
				array [i] = temp;
				swapped = true;
			}

             // This loops for every pair of consecutive values in the array.
             // Values are array[i-1] and array[i].

             // TODO: Add missing code:
             //       Check if the value on the left (array[i-1]) is greater
             //       than the value on the right (array[i]). If so, swap
             //       the two array elements and record the swap.
        }
    }while (swapped);
}

let a = [1,2,3,4,6,5]
let b = "";
let c = "";
console.log(arr);
bubbleSort(arr);
console.log(arr);
a = arr


/*
let check = [];
for (let i = 1; i < a.length; i++)
{
	if (a[i] >= a[i-1])
	{
		b = " IS larger than "
		c = "...TRUE!"
	}
	else
	{
		b = " is NOT larger than "
		c = "...ERROR!"
	}
	check[i-1] = a[i] + b + a[i-1] + c
}

console.log(check)
check = [true]
console.log(check)
*/


let check = [];
for (let i = 1; i < a.length; i++)
{
	if (a[i] >= a[i-1])
	{
		check = 1
	}
	else
	{
		check = Error("The array is NOT in sorted order")
	}
}
if (check == [1])
{
	check = "The array is in CORRECTLY sorted order"
}

console.log(check)
