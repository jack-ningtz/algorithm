function bubble_sort(arr:number[]):number[]
{
    for(let i = 0; i < arr.length; i++)
	{
		for(let a = 0; a < arr.length - i - 1; a++)
		{
	         if(arr[a] > arr[a+1])
			 {
				let temp = arr[a];
				arr[a] = arr[a+1];
				arr[a+1] = temp;
			 }
		}
	}
    return arr;
}

function select_sort(arr:number[]) : number[]
{
	let minindex:number;
    for(let i = 0; i < arr.length; i++)
	{
		minindex = i;
		for(let a = i + 1; a < arr.length; a++)
		{
              if(arr[minindex] > arr[a])
			  {
                  minindex = a;
			  }
		}
		let temp = arr[i];
		arr[i] = arr[minindex];
		arr[minindex] = temp;
	}
	return arr;
}
function insert_sort(arr:number[]) : number[]
{
	let current:number;
    for(let i = 1; i < arr.length; i++)
	{
        let preIndex = i - 1;
		current = arr[i];
		while(preIndex >= 0 && arr[preIndex] > current)
		{
			arr[preIndex + 1]= arr[preIndex] ;
			preIndex--;
		}
		arr[preIndex + 1] = current;
	}
	return arr;
}

function shell_sort(arr:number[]) : number[]
{
	
	for(let gap = parseInt(String(arr.length/2));  //Math.floor(arr.length/2);
	    gap > 0; 
	    gap = parseInt(String(gap/2))
		)
	{
		for(let i = gap; i<arr.length; i++)
		{
			let current = arr[i];
			let preIndex = i - gap;
			for( preIndex ; preIndex >= 0 && arr[preIndex] > current; preIndex -= gap)
			{
			    arr[preIndex + gap] = arr[preIndex];
			}
			arr[preIndex + gap] = current;
		}
	}
	return arr;
}

/** --------------------------------merge sort------------------ */
function merge(left:number[],right:number[]) : any
{
    var result = [];
    while(left.length > 0 && right.length>0)
	{
		if(left[0] <= right[0])
		{
			result.push(left.shift());
		}
		else
		{
			result.push(right.shift());
		}
	}
	while(left.length)
	{
		result.push(left.shift());
	}
	while(right.length)
	{
		result.push(right.shift());
	}
	return result;
}
function merge_sort_up2down(arr:number[]) : any //自上而下递归方式
{
    let len =  arr.length;
	if(len < 2 ) return arr;
	let middle = Math.floor(len / 2); // 拆分子串
	let left = arr.slice(0,middle);   // 左字串
	let right = arr.slice(middle);    // 右子串
	return merge(
		merge_sort_up2down(left), 
		merge_sort_up2down(right) //对左右子串再拆分，直到只有一个元素
		); 
}

function merge_sort_down2up(arr:number[]) : any //自下而上
{
	let _arr = arr;
    let result : number[];
    for(let n = 1; n <= arr.length; n*=2) // n 相邻子串长度
	{
		let i = 0;
		result = [];
        for(i ; i + 2*n  <= arr.length; i+=(2*n))
		{			
			let left = _arr.slice(i, i + n);
			let right = _arr.slice(i + n, i + 2*n);	 
			result = merge(left,right);
			_arr.splice(i,result.length,...result);		      		
		}
		// 剩余子串排序
        if(i + n < arr.length)
		{
			let left = _arr.slice(0,i+n);
			let right = _arr.slice(i+n, arr.length);
			_arr = merge(left,right);
		}

	}   
	return _arr;
}
/** --------------------------------end merge sort------------------ */

function quick_sort(arr:number[],left:number, right:number) : number[]
{
	if(left < right)
	{
		//partition
		let partionIndex = left; 
		let pivot = arr[left];//pivot value;
        
		for(let i = left + 1; i <= right; i++)
		{
			if(arr[i] < pivot) 
			{
				partionIndex++;	
				let temp = arr[i];
				arr[i] = arr[partionIndex];
				arr[partionIndex]  = temp;	
			}
			
		}
		// let temp = arr[partionIndex];
		// arr[partionIndex] = arr[left];
		// arr[left] = temp;
        arr[left] = arr[partionIndex];
		arr[partionIndex] = pivot;

		quick_sort(arr, left ,partionIndex - 1);
		quick_sort(arr, partionIndex + 1, right);
	}
	return arr;
}

function quick_sort2(arr:number[],left:number,right:number):number[]
{
	if(left < right)
	{
		let i,j,key;
		i = left;
		j = right;
		key = arr[i];
		while (i < j)
		{
			while(i<j && arr[j] > key)
			{
				j--; 
			}
			if( i < j)
			{
				arr[i++] = arr[j];
			}
			while(i < j && arr[i] < key)
			{
				i++;
			}
			if(i < j)
			{
				arr[j--] = arr[i];
			}
		}
		arr[i] = key;
		quick_sort2(arr,left,i-1);  // for left sub array quick sort 
		quick_sort2(arr,i+1,right); // for right sub array quick sort
	}
    return arr;
}
//*************** heap sort ******************/
//最大堆
function heap_tree_down(arr:number[],start:number,end:number)
{
   let current = start;
   let left = 2 * current + 1;
   let cvalue = arr[current];
   while(left <= end)
   {
	    if(left < end && arr[left] < arr[left + 1])
		{
           left++;
		}
		if(cvalue >= arr[left])
		{
			break;
		}
		else
		{
			arr[current] = arr[left];
			arr[left] = cvalue;
			current = left;
			left = 2 * left + 1;
		}
   }
//    arr[current] = cvalue;
}
function heap_tree_up(arr:number[],start:number)
{
	let c = start;
	let p = Math.floor((c-1)/2);
	let cvalue = arr[c];
	while(c > 0)
	{
		if(arr[p] <= cvalue)
		{
			break;
		}
		else
		{
			arr[c] = arr[p];
			c = p;
			p = Math.floor((p-1)/2);
		}
	}
	arr[c] = cvalue;
}
function heap_sort(arr:number[]) : number[]
{
	let i;
	//返回最大二叉堆
	for(i = Math.floor(arr.length/2 - 1); i >= 0; i--)
	{
		heap_tree_down(arr,i, arr.length -1);
	}
	for(i = arr.length - 1; i > 0; i--)
	{
		let temp = arr[0];
		arr[0] = arr[i];
		arr[i] = temp;
		heap_tree_down(arr,0 ,i-1);
	}
	// for(let i = 0; i < arr.length; i++)
	// {
	// 	   heap_tree_up(arr,i);
	// }
	return arr;
}
//*************** heap sort ******************/

function count_sort(arr:number[]) : number[]
{
	if(arr.length < 2) 
	    return arr;
	let max = Math.max(...arr); 
	let countarr:number[] = Array(max + 1);
    //初始化数组
    for(let i = 0; i < countarr.length; i++)
	{
		countarr[i] = 0;
	}
    for(let i of arr)
	{
		countarr[i] += 1;
	}
	let new_arr:number[] = [];
    for(let i = 0; i < countarr.length; i++)
	{
		while(countarr[i] > 0)
		{
            new_arr.push(i);
			countarr[i]--;
		}
	}
	return new_arr;
}

function bucket_sort(arr:number[]): number[]
{
	if(arr.length < 2) return arr;
	let min = Math.min(...arr);
	let max = Math.max(...arr);
    let bucketSize = 5; 
	let bucketCount = Math.floor((max - min)/ bucketSize) + 1;
	let buckets = new Array(bucketCount);
	for(let i = 0; i < buckets.length; i++)
	{
		buckets[i] = [];
	}
	for(let i = 0; i < arr.length; i++)
	{
		buckets[Math.floor((arr[i]- min)/bucketSize)].push(arr[i]);
	}
	let new_arr = [];
	for(let i = 0; i< buckets.length; i++)
	{
		buckets[i] = insert_sort(buckets[i]);
		for(let j = 0; j < buckets[i].length; j++)
		{
			new_arr.push(buckets[i][j]);
		}
	}
	return new_arr;
}
function radix_sort(arr:number[]) : number[]
{
	let max = Math.max(...arr);

	let place = 1;
	while( max >= 10 ** place)
	{
		place++; //确定位数
	}

	for(let p = 0; p < place; p++)
	{
		// 分10桶
         let buckets =  Array(10);
		 for(let i = 0; i < buckets.length; i++)
		 {
			 buckets[i] = []; // 初始化
		 }
		 for(let i = 0; i < arr.length; i++)
		 {
			let radix = Math.floor(arr[i] / (10 ** p)) % 10;
			buckets[radix].push(arr[i]);
		 }
		 let pos = 0;
		 for(let i = 0; i < buckets.length; i++)
		 {
            if(buckets[i].length > 0)
			{
				let value ;
                while((value = buckets[i].shift()) != null)
				{
					arr[pos++] = value;
				}
			}
		 }
    }
	return arr;
}
console.log(radix_sort([12,36,4,2,18,10,2,3,0,2]))
