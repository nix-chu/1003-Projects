/*
 *  Selection Sort
 *  Loop over entire array to be sorted
 *         For each item,
         Assume item at i is the 'smallest' item
        Search the array from i+1 => end of array for the smallest item
            If there is a smaller item, save that index as the new 'smallest' item
        If the smallest item index is not i
            Swap the items (i and the smallest item index)
        Increment i

 */
function selectionSort(array)
{
    console.log("Data: " + array);
    console.log("");
    // Move through the list selecting the lowest value from
    // remaining elements.  Everything before index i will be
    // sorted.
    for (let i = 0; i < array.length - 1; ++i)
    {
        // min is the index of the lowest value we've seen in
        // remaining elements.
        let min = i;
        console.log("Assuming minimum item is at index: " + min + " (value="+array[i]+")");
        console.log("<b>Current items</b>: " + array);
        // For each remaining element beyond i
        for (let j = i + 1; j < array.length; ++j)
        {
            // See if this value it lower than the value at
            // index min.
            if (array[j] < array[min])
            {
                // If it is, make this the new min index.
                min = j;
                console.log("Found smaller item at index: " + min + " (value="+array[min]+")");
            }
        }
        console.log("Min value at index: " + min);
        // If the lowest value was not already at index i
        if (min != i)
        {
            console.log("Lowest value not at index " + i);
            // Swap elements to put the lowest value at index i
            console.log("Swapping item at " + min + " to " + i);
            let temp = array[i];
            array[i] = array[min];
            array[min] = temp;
        } else { console.log("Min value item at index: " + min + " is in correct pos");}
        // Everything up to index i is now sorted, increment i.
        console.log("");
        console.log("Increment i: " + i + " => " + (i+1));
        console.log("");
    }
    console.log("Result: " + array);
}

let arr = [1,0,12,50,46,4];

selectionSort(arr);
