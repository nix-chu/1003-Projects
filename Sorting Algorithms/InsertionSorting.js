function insertionSort(array)
{
	console.log("array: " + arr);
	console.log("");
   for (let i = 0, j; i < array.length; ++i)
   {
      let tmp = array[i];
	   console.log("tmp: "+tmp + ", index: " + i);
      for (j = i - 1; j >= 0 && (array[j] > tmp); --j)
      {
		  console.log("j: " + j);
		  console.log("value: " + array[j+1] + " (index:"+ (j+1) +") " + " => " + "value: " + array[j] + " (index:"+j+")");
         array[j + 1] = array[j];
		  if ((j-1) >= 0){
			  if(array[(j-1)] > tmp){
				console.log(array[(j-1)] + " larger than " + tmp + ". continuing");
			  } else{
				console.log(array[(j-1)] + " not larger than " + tmp + ". stopping");
			  }
		  } else {
			  console.log("next..");
		  }
      }
	   console.log( array[j+1] + " ( "+ (j+1) +" ) " + " => " + tmp);
      array[j + 1] = tmp;

	   console.log(arr);
	   console.log("");
   }
	console.log(arr);
}

let arr = [1,0,12,50,46,4];

insertionSort(arr);
