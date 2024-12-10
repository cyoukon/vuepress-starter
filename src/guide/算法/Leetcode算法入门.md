# Leetcode算法入门

## 第 1 天 二分查找

### [704. 二分查找](https://leetcode-cn.com/problems/binary-search/)

#### 题目

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

**示例 1:**

```
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4
```

**示例 2:**

```
输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1
```

**提示：**

1. 你可以假设 nums 中的所有元素是不重复的。
2. n 将在 [1, 10000]之间。
3. nums 的每个元素都将在 [-9999, 9999]之间。

#### 题解

对于有序数组，要在数组中寻找目标值，可以考虑二分法。

- 如果中间值等于目标值，则此项即为目标
- 如果中间值小于目标值，则目标值位于中间值右侧
- 如果中间值大于目标值，则目标值位于中间值左侧

每次查找都会将查找范围缩小一半，，因此二分查找的时间复杂度是*O(log n)*，其中 n*n* 是数组的长度。

二分查找的条件是查找范围不为空，即*left*≤*right*。

```C#
public class Solution
{
    public int Search(int[] nums, int target)
    {
        var low = 0;
        var high = nums.Length - 1;
        while (low <= high)
        {
            // 虽然本题不会溢出，但是为了防止溢出，不要写 var mid = (low + high) / 2
            var mid = (low - high) / 2 + low;
            if (nums[mid] == target)
            {
                return mid;
            }
            else if (nums[mid] < target)
            {
                low = mid + 1;
            }
            else
            {
                high = mid - 1;
            }
        }
        return -1;
    }
}
```

#### 复杂度分析

- 时间复杂度：O(log n)，其中 n 是数组的长度。
- 空间复杂度：O(1)。

### [278. 第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)

#### 题目

你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。

假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。

你可以通过调用 `bool isBadVersion(version)` 接口来判断版本号 `version` 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。

**示例 1：**

```
输入：n = 5, bad = 4
输出：4
解释：
调用 isBadVersion(3) -> false 
调用 isBadVersion(5) -> true 
调用 isBadVersion(4) -> true
所以，4 是第一个错误的版本。
```

**示例 2：**

```
输入：n = 1, bad = 1
输出：1
```


提示：

- 1 <= bad <= n <= 2^31^ - 1

####   题解

```C#
/* The isBadVersion API is defined in the parent class VersionControl.
      bool IsBadVersion(int version); */
public class Solution : VersionControl
{
    public int FirstBadVersion(int n)
    {
        var low = 1;
        var high = n;
        while (low < high) // 循环直至区间左右端点相同
        {
            int mid = low + (high - low) / 2; // 防止计算时溢出
            if (IsBadVersion(mid))
            {
                high = mid; // 答案在区间 [low, mid] 中
            }
            else
            {
                low = mid + 1;
            }
        }
        // 此时有 low == high，区间缩为一个点，即为答案
        return low;
    }
}
```

#### 复杂度分析

- 时间复杂度：O(log n)，其中 n 是给定版本的数量。
- 空间复杂度：O(1)。我们只需要常数的空间保存若干变量。

### [35. 搜索插入位置](https://leetcode-cn.com/problems/search-insert-position/)

#### 题目

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 O(log n) 的算法。

**示例 1:**

```
输入: nums = [1,3,5,6], target = 5
输出: 2
```

**示例 2:**

```
输入: nums = [1,3,5,6], target = 2
输出: 1
```

**示例 3:**

```
输入: nums = [1,3,5,6], target = 7
输出: 4
```

**示例 4:**

```
输入: nums = [1,3,5,6], target = 0
输出: 0
```

**示例 5:**

```
输入: nums = [1], target = 0
输出: 0
```

**提示:**

- 1 <= nums.length <= 10^4^
- -10^4^ <= nums[i] <= 10^4^
- nums 为无重复元素的升序排列数组
- -10^4^ <= target <= 10^4^

#### 题解

```C#
public class Solution
{
    public int SearchInsert(int[] nums, int target)
    {
        var low = 0;
        var high = nums.Length - 1;
        while (low <= high)
        {
            var mid = low + (high - low) / 2;
            if (nums[mid] == target)
            {
                // 找到目标值，直接返回
                return mid;
            }
            else if (nums[mid] < target)
            {
                low = mid + 1;
            }
            else
            {
                high = mid - 1;
            }
        }
        // 没找到目标值，考虑三种情况
        // 1. 目标比数组最小值小，返回0
        // 2. 目标比数组最大值大，返回数组长度
        // 3. 目标在数组最大值和最小值之间，如【1,2,3,4,5,7】和 6，返回 5
        // 综合以上情况，返回 low 即可
        return low;
    }
}
```

#### 复杂度分析

- 时间复杂度：O(log n)，其中 n 为数组的长度。二分查找所需的时间复杂度为 O(log n)。

- 空间复杂度：O(1)。我们只需要常数空间存放若干变量。

## 第 2 天 双指针

### [977. 有序数组的平方](https://leetcode-cn.com/problems/squares-of-a-sorted-array/)

#### 题目

给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

**示例 1：**

```
输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
```

**示例 2：**

```
输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121]
```

**提示：**

- 1 <= nums.length <= 104
- -104 <= nums[i] <= 104
- nums 已按 非递减顺序 排序

**进阶：**

- 请你设计时间复杂度为 O(n) 的算法解决本问题

#### 题解1

```C#
public class Solution
{
    public int[] SortedSquares(int[] nums)
    {
        // 将数组分为正数和负数两个部分，将两个指针分别指向边界两边，
        // 每次比较两指针对应的数，将较小的数放入答案并移动指针
        var boundary = -1;
        // 找到边界索引
        for (int i = 0; i < nums.Length; i++)
        {
            if (nums[i] < 0)
            {
                boundary = i;
            }
            else
            {
                break;
            }
        }
        var ans = new int[nums.Length];
        var leftPointer = boundary;
        var rightPointer = boundary + 1;
        var index = 0;
        // 只要两指针有一个没有超出数组边界，就继续
        while (leftPointer >= 0 || rightPointer < nums.Length)
        {
            // 右指针没超出数组边界，左指针已超出边界，取右指针对应的值
            if (leftPointer < 0)
            {
                ans[index] = nums[rightPointer] * nums[rightPointer];
                ++rightPointer;
            }
            // 左指针没超出数组边界，右指针已超出边界，取左指针对应的值
            else if (rightPointer > nums.Length - 1)
            {
                ans[index] = nums[leftPointer] * nums[leftPointer];
                --leftPointer;
            }
            // 两指针都没超出数组边界时，选择对应值较小的一个放入答案数组
            else if (nums[leftPointer] * nums[leftPointer] < nums[rightPointer] * nums[rightPointer])
            {
                ans[index] = nums[leftPointer] * nums[leftPointer];
                --leftPointer;
            }
            else
            {
                ans[index] = nums[rightPointer] * nums[rightPointer];
                ++rightPointer;
            }
            ++index;
        }
        return ans;
    }
}
```

#### 复杂度分析1

- 时间复杂度：O(n)，其中 n 是数组 nums 的长度。

- 空间复杂度：O(1)。除了存储答案的数组以外，我们只需要维护常量空间。

#### 题解2

```c#
public class Solution
{
    public int[] SortedSquares(int[] nums)
    {
        // 我们可以使用两个指针分别指向位置 0 和 n−1，每次比较两个指针对应的数，
        // 选择较大的那个逆序放入答案并移动指针。这种方法无需处理某一指针移动至边界的情况。
        var ans = new int[nums.Length];
        var leftPointer = 0;
        var rightPointer = nums.Length - 1;
        var index = nums.Length - 1;
        while (leftPointer <= rightPointer)
        {
            var left = nums[leftPointer] * nums[leftPointer];
            var right = nums[rightPointer] * nums[rightPointer];
            if (left < right)
            {
                ans[index] = right;
                --rightPointer;
            }
            else
            {
                ans[index] = left;
                ++leftPointer;
            }
            --index;
        }
        return ans;
    }
}
```

#### 复杂度分析2

- 时间复杂度：O(n)，其中 n 是数组 nums 的长度。

- 空间复杂度：O(1)。除了存储答案的数组以外，我们只需要维护常量空间。

### [189. 轮转数组](https://leetcode-cn.com/problems/rotate-array/)

#### 题目

给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

**示例 1:**

```
输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]
```

**示例 2:**

```
输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释: 
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]
```

**提示：**

- 1 <= nums.length <= 10^5^
- -2^31^ <= nums[i] <= 2^31^ - 1
- 0 <= k <= 10^5^

**进阶：**

- 尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。
- 你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？

#### 题解

```C#
public class Solution
{
    public void Rotate(int[] nums, int k)
    {
        // 我们可以先将所有元素翻转，这样尾部的 k 个元素就被移至数组头部，
        // 然后我们再翻转 [0, k - 1] 区间的元素和 [k, n-1] 区间的元素即能得到最后的答案。
        k %= nums.Length;
        Reverse(nums, 0, nums.Length - 1);
        Reverse(nums, 0, k - 1);
        Reverse(nums, k, nums.Length - 1);
    }

    public void Reverse(int[] nums, int start, int end)
    {
        while (start < end)
        {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start += 1;
            end -= 1;
        }
    }
}
```

#### 复杂度分析

时间复杂度：O(n)，其中 n 为数组的长度。每个元素被翻转两次，一共 n 个元素，因此总时间复杂度为 O(2n)=O(n)。

空间复杂度：O(1)。

## 第 3 天 双指针

### [283. 移动零](https://leetcode-cn.com/problems/move-zeroes/)

#### 题目

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

**示例 1:**

```
输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
```

**示例 2:**

```
输入: nums = [0]
输出: [0]
```

**提示:**

- 1 <= nums.length <= 10^4^

- -2^31^ <= nums[i] <= 2^31^ - 1

**进阶：**

你能尽量减少完成的操作次数吗？

#### 题解

```C#
public class Solution
{
    public void MoveZeroes(int[] nums)
    {
        // 使用双指针，左指针指向当前已经处理好的序列的尾部，右指针指向待处理序列的头部。
        // 右指针不断向右移动，每次右指针指向非零数，则将左右指针对应的数交换，同时左指针右移。
        // 注意到以下性质：
        // 左指针左边均为非零数；
        // 右指针左边直到左指针处均为零。
        // 因此每次交换，都是将左指针的零与右指针的非零数交换，且非零数的相对顺序并未改变。
        var left = 0;
        var right = 0;
        while (right < nums.Length)
        {
            if (nums[right] != 0)
            {
                (nums[right], nums[left]) = (nums[left], nums[right]);
                ++left;
            }
            ++right;
        }
    }
}
```

#### 复杂度分析

- 时间复杂度：O(n)，其中 n 为序列长度。每个位置至多被遍历两次。
- 空间复杂度：O(1)。只需要常数的空间存放若干变量。

### [167. 两数之和 II - 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)

#### 题目

给你一个 **下标从 1 开始** 的整数数组 numbers ，该数组已按 非递减顺序排列  ，请你从数组中找出满足相加之和等于目标数 target 的两个数。如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，则 1 <= index1 < index2 <= numbers.length 。

以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。

你可以假设每个输入 **只对应唯一的答案** ，而且你 **不可以** 重复使用相同的元素。

你所设计的解决方案必须只使用常量级的额外空间。

**示例 1：**

```
输入：numbers = [2,7,11,15], target = 9
输出：[1,2]
解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
```

**示例 2：**

```
输入：numbers = [2,3,4], target = 6
输出：[1,3]
解释：2 与 4 之和等于目标数 6 。因此 index1 = 1, index2 = 3 。返回 [1, 3] 。
```

**示例 3：**

```
输入：numbers = [-1,0], target = -1
输出：[1,2]
解释：-1 与 0 之和等于目标数 -1 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
```


提示：

- 2 <= numbers.length <= 3 * 10^4^

- -1000 <= numbers[i] <= 1000

- numbers 按 **非递减顺序** 排列

- -1000 <= target <= 1000

- **仅存在一个有效答案**

#### 题解

初始时两个指针分别指向第一个元素位置和最后一个元素的位置。每次计算两个指针指向的两个元素之和，并和目标值比较。如果两个元素之和等于目标值，则发现了唯一解。如果两个元素之和小于目标值，则将左侧指针右移一位。如果两个元素之和大于目标值，则将右侧指针左移一位。移动指针之后，重复上述操作，直到找到答案。

> 假设答案索引分别是i和j，那么i和j就是左右端点，否则左右指针一定有一个先到达答案索引，所以不会错过正确答案。
>

```C#
public class Solution
{
    public int[] TwoSum(int[] numbers, int target)
    {
        var lowPointer = 0;
        var highPointer = numbers.Length - 1;
        while (lowPointer < highPointer)
        {
            var sum = numbers[lowPointer] + numbers[highPointer];
            if (sum == target)
            {
                return new[] {lowPointer + 1, highPointer + 1};
            }
            else if (sum < target)
            {
                ++lowPointer;
            }
            else
            {
                --highPointer;
            }
        }
        return new[] { -1, -1 };
    }
}
```

#### 复杂度分析

- 时间复杂度：O(n)，其中 n 是数组的长度。两个指针移动的总次数最多为 n 次。
- 空间复杂度：O(1)。

## 第 4 天 双指针

### [344. 反转字符串](https://leetcode-cn.com/problems/reverse-string/)

#### 题目

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

**示例 1：**

```
输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

**示例 2：**

```
输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```

**提示：**

- 1 <= s.length <= 10^5^

- s[i] 都是 ASCII 码表中的可打印字符

#### 题解

双指针同时指向数组两端，交换指针处元素值后，两指针同时向中间移动一位即可

```C#
public class Solution
{
    public void ReverseString(char[] s)
    {
        var low = 0;
        var high = s.Length - 1;
        while (low < high)
        {
            (s[low], s[high]) = (s[high], s[low]);
            low++;
            high--;
        }
    }
}
```

#### 复杂度分析

- 时间复杂度：O(N)，其中 N 为字符数组的长度。一共执行了 N/2 次的交换。

- 空间复杂度：O(1)。只使用了常数空间来存放若干变量。

### [557. 反转字符串中的单词 III](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/)

#### 题目

给定一个字符串 s ，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

**示例 1：**

```
输入：s = "Let's take LeetCode contest"
输出："s'teL ekat edoCteeL tsetnoc"
```

**示例 2:**

```
输入： s = "God Ding"
输出："doG gniD"
```

**提示：**

- 1 <= s.length <= 5 * 10^4^

- s 包含可打印的 ASCII 字符。

- s 不包含任何开头或结尾空格。

- s 里 至少 有一个词。

- s 中的所有单词都用一个空格隔开。

#### 题解

下面两种方法思路是一样的，开辟一个新字符串。然后从头到尾遍历原字符串，直到找到空格为止，此时找到了一个单词，并能得到单词的起止位置。随后，根据单词的起止位置，可以将该单词逆序放到新字符串当中。如此循环多次，直到遍历完原字符串，就能得到翻转后的结果。

```C#
public class Solution
{
    public string ReverseWords(string s)
    {
        var low = 0;
        var high = 0;
        var sb = new StringBuilder(s);
        sb.Append(' ');
        for (int i = 0; i < sb.Length; i++)
        {
            if (sb[i] == ' ')
            {
                high = i - 1;
                while (low < high)
                {
                    (sb[low], sb[high]) = (sb[high], sb[low]);
                    low++;
                    high--;
                }
                low = i + 1;
            }
        }
        return sb.Remove(sb.Length - 1, 1).ToString();
    }
}
```

```C#
public class Solution
{
    public string ReverseWords(string s)
    {
        var low = 0;
        var high = 0;
        var sb = new StringBuilder(s);
        for (int i = 0; i < sb.Length; i++)
        {
            if (sb[i] == ' ')
            {
                high = i - 1;
                DoublePointer(ref low, ref high, sb, i);
            }
            else if (i == sb.Length - 1)
            {
                high = i;
                DoublePointer(ref low, ref high, sb, i);
            }
        }
        return sb.ToString();
    }

    private void DoublePointer(ref int low, ref int high, StringBuilder sb, int i)
    {
        while (low < high)
        {
            (sb[low], sb[high]) = (sb[high], sb[low]);
            low++;
            high--;
        }
        low = i + 1;
    }
}
```

#### 复杂度分析

- 时间复杂度：O(N)，其中 N 为字符串的长度。原字符串中的每个字符都会在 O(1) 的时间内放入新字符串中。

- 空间复杂度：O(N)。我们开辟了与原字符串等大的空间。

## 第5天 双指针

### [876. 链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

#### 题目

给定一个头结点为 head 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。

**示例 1：**

```
输入：[1,2,3,4,5]
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.
```

**示例 2：**

```
输入：[1,2,3,4,5,6]
输出：此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
```

**提示：**

- 给定链表的结点数介于 1 和 100 之间。

#### 题解

```C#
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val=0, ListNode next=null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
public class Solution
{
    public ListNode MiddleNode(ListNode head)
    {
        var low = head;
        var high = head;
        // 左节点每向右移动一位，右节点向右移动2位
        // 以保证左节点位于左端点与右节点中间
        while (high != null && high.next != null)
        {
            low = low.next;
            high = high.next.next;
        }
        return low;
    }
}
```

#### 复杂度分析

- 时间复杂度：O(N)，其中 N 是给定链表的结点数目。

- 空间复杂度：O(1)，只需要常数空间存放两个指针。

### [19. 删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

#### 题目

给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

**示例 1：**

```
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

**示例 2：**

```
输入：head = [1], n = 1
输出：[]
```

**示例 3：**

```
输入：head = [1,2], n = 1
输出：[1]
```

**提示：**

- 链表中结点的数目为 sz

- 1 <= sz <= 30

- 0 <= Node.val <= 100

- 1 <= n <= sz

**进阶：**你能尝试使用一趟扫描实现吗？

#### 题解

```C#
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val=0, ListNode next=null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
public class Solution
{
    public ListNode RemoveNthFromEnd(ListNode head, int n)
    {
        // 两个指针，高位指针比低位指针先走n步
        var low = head;
        var high = head;
        var step = 0;
        while (high.next != null)
        {
            if (step < n)
            {
                high = high.next;
                step++;
            }
            else
            {
                high = high.next;
                low = low.next;
            }
        }
        // 链表长度为1时
        if (low.next == null)
        {
            head = null;
        }
        // 链表长度等于步长时
        else if (step < n)
        {
            head = head.next;
        }
        else
        {
            low.next = low.next.next;
        }
        return head;
    }
}
```

#### 复杂度分析

- 时间复杂度：O(L)，其中 L** 是链表的长度。
- 空间复杂度：O(1)。

## 第6天 滑动窗口

### [3. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

#### 题目

给定一个字符串 `s` ，请你找出其中不含有重复字符的 **最长子串** 的长度。

**示例 1:**

```
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

**示例 2:**

```
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

**示例 3:**

```
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

**提示：**

- 0 <= s.length <= 5 * 10^4^
- s 由英文字母、数字、符号和空格组成

#### 题解

```C#
public class Solution
{
    public int LengthOfLongestSubstring(string s)
    {
        // 这里不用List，List要确认某个char是否被包含需要o(n)的时间复杂度，HashSet只要o(1)
        var hashSet = new HashSet<char>();
        int left = 0, right = 0;
        var ans = 0;
        for (; left < s.Length; left++)
        {
            while (right < s.Length && !hashSet.Contains(s[right]))
            {
                hashSet.Add(s[right]);
                right++;
            }
            ans = Math.Max(ans, right - left);

            // 左指针将要向右移动，当前左指针处元素
            hashSet.Remove(s[left]);
        }
        return ans;
    }
}
```

#### 复杂度分析

时间复杂度：O(N)，其中 NN 是字符串的长度。左指针和右指针分别会遍历整个字符串一次。

空间复杂度：O(∣Σ∣)，其中Σ 表示字符集（即字符串中可以出现的字符），∣Σ∣ 表示字符集的大小。在本题中没有明确说明字符集，因此可以默认为所有 ASCII 码在 [0, 128)[0,128) 内的字符，即∣Σ∣=128。我们需要用到哈希集合来存储出现过的字符，而字符最多有∣Σ∣ 个，因此空间复杂度为 O(∣Σ∣)。

### [567. 字符串的排列](https://leetcode-cn.com/problems/permutation-in-string/)

#### 题目

给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。

换句话说，s1 的排列之一是 s2 的 子串 。

**示例 1：**

```
输入：s1 = "ab" s2 = "eidbaooo"
输出：true
解释：s2 包含 s1 的排列之一 ("ba").
```

**示例 2：**

```
输入：s1= "ab" s2 = "eidboaoo"
输出：false
```

**提示：**

- 1 <= s1.length, s2.length <= 10^4^

- s1 和 s2 仅包含小写字母

#### 题解

```C#
public class Solution
{
    public bool CheckInclusion(string sonStr, string parentStr)
    {
        var sonLenth = sonStr.Length;
        var parentLenth = parentStr.Length;
        // s1比s2长时，s1不可能是s2的子串
        if (sonLenth > parentLenth)
        {
            return false;
        }

        // 由于排列不会改变字符串中每个字符的个数，
        // 所以只有当两个字符串每个字符的个数均相等时，
        // 一个字符串才是另一个字符串的排列。
        // 题中字符串仅由小写字母构成，用长度为26的数组记录字符出现的次数
        var sonCount = new int[26];
        var parentCount = new int[26];
        for (int i = 0; i < sonLenth; ++i)
        {
            ++sonCount[sonStr[i] - 'a'];
            ++parentCount[parentStr[i] - 'a'];
        }
        if (sonCount.SequenceEqual(parentCount))
        {
            return true;
        }
        // 开始在父字符串上向右滑动
        for (int i = sonLenth; i < parentLenth; ++i)
        {
            // 当前滑动窗口最左边字符出现次数减一
            --parentCount[parentStr[i - sonLenth] - 'a'];
            // 当前滑动窗口最右边字符出现次数加一
            ++parentCount[parentStr[i] - 'a'];
            if (sonCount.SequenceEqual(parentCount))
            {
                return true;
            }
        }
        return false;
    }
}
```

#### 复杂度分析

时间复杂度：O(n+m+∣Σ∣)，其中 n 是字符串s1  的长度，m 是字符串 s2 的长度，Σ 是字符集，这道题中的字符集是小写字母，∣Σ∣=26。

空间复杂度：O(∣Σ∣)。

## 第7天 广度优先搜索 / 深度优先搜索

### [733. 图像渲染](https://leetcode-cn.com/problems/flood-fill/)

#### 题目

有一幅以二维整数数组表示的图画，每一个整数表示该图画的像素值大小，数值在 0 到 65535 之间。

给你一个坐标 (sr, sc) 表示图像渲染开始的像素值（行 ，列）和一个新的颜色值 newColor，让你重新上色这幅图像。

为了完成上色工作，从初始坐标开始，记录初始坐标的上下左右四个方向上像素值与初始坐标相同的相连像素点，接着再记录这四个方向上符合条件的像素点与他们对应四个方向上像素值与初始坐标相同的相连像素点，……，重复该过程。将所有有记录的像素点的颜色值改为新的颜色值。

最后返回经过上色渲染后的图像。

**示例 1:**

```
输入: 
image = [[1,1,1],
         [1,1,0],
         [1,0,1]]
sr = 1, sc = 1, newColor = 2
输出: [[2,2,2],[2,2,0],[2,0,1]]
解析: 
在图像的正中间，(坐标(sr,sc)=(1,1)),
在上下左右连通路径上所有与指定坐标颜色相同的像素点的颜色都被更改成2。
注意，右下角的像素没有更改为2，
因为它被0隔开了，不是在上下左右四个方向上与初始点相连的像素点。
```

**注意:**

- image 和 image[0] 的长度在范围 [1, 50] 内。
- 给出的初始点将满足 0 <= sr < image.length 和 0 <= sc < image[0].length。
- `image[i][j]` 和 newColor 表示的颜色值在范围 [0, 65535]内。

#### 题解

- 广度优先搜索

> - 我们设置一个队列，先把初始点添加进去
> - 规定每次从队列取出一个坐标
> - 对这个坐标染色，并且把这个坐标的邻居（符合要求且不重复的好邻居），放到队列中。
> - 当这个队列为空的时候，说明染色完成

```C#
public class Solution
{
    public int[][] FloodFill(int[][] image, int sr, int sc, int newColor)
    {
        return Bfs(image, sr, sc, newColor);
    }

    /// <summary>
    /// 广度优先搜索
    /// </summary>
    private int[][] Bfs(int[][] image, int srcRow, int srcColumn, int newColor)
    {
        // 记录初始颜色
        var originColor = image[srcRow][srcColumn];
        // 其实颜色和目标颜色相同，直接返回原图
        if (originColor == newColor)
        {
            return image;
        }
        // 左上右下四个方向单次偏移量
        var directions = new int[][] { new[] { -1, 0 }, new[] { 0, 1 }, new[] { 1, 0 }, new[] { 0, -1 } };
        // 使用队列记录遍历位置，先进先出
        var queue = new Queue<(int row, int column)>();
        // 放入起始位置
        queue.Enqueue((srcRow, srcColumn));
        while (queue.Count > 0)
        {
            var currPoint = queue.Dequeue();
            image[currPoint.row][currPoint.column] = newColor;
            // 遍历四个方向，查找是否有颜色相同的点
            foreach (var direction in directions)
            {
                var newRow = currPoint.row + direction[0];
                var newColumn = currPoint.column + direction[1];

                if (newRow >= 0 && newRow < image.Length             // 行索引在数组范围内
                    && newColumn >= 0 && newColumn < image[0].Length // 列索引在数组范围内
                    && image[newRow][newColumn] == originColor)      // 当前点颜色与初始点颜色相同
                {
                    queue.Enqueue((newRow, newColumn));
                }
            }
        }
        return image;
    }
}
```

- 深度优先搜索

> - 我们设置一个栈，先把初始点添加进去
>
> - 规定每次从栈中取出一个坐标
>
> - 对这个坐标染色，并且把这个坐标的一个方向上的邻居（符合要求且不重复的好邻居），放到栈中。
>
> - 当这个方向没有复合要求的邻居的时候，进入下一个方向
>
> - 当这个栈为空的时候，说明染色完成

深度优先搜索有以下两种实现方式

1. 递归
2. 使用栈 Stack

```C#
public class Solution
{
    public int[][] FloodFill(int[][] image, int sr, int sc, int newColor)
    {
        return Dfs(image, sr, sc, newColor);
    }

    /// <summary>
    /// 深度优先搜索
    /// </summary>
    private int[][] Dfs(int[][] image, int srcRow, int srcColumn, int newColor)
    {
        // 记录初始颜色
        var originColor = image[srcRow][srcColumn];
        // 其实颜色和目标颜色相同，直接返回原图
        if (originColor == newColor)
        {
            return image;
        }
        // 左上右下四个方向单次偏移量
        var directions = new int[][] { new[] { -1, 0 }, new[] { 0, 1 }, new[] { 1, 0 }, new[] { 0, -1 } };
        // 使用栈记录遍历位置，先进后出
        var stack = new Stack<(int row, int column)>();
        // 放入起始位置
        stack.Push((srcRow, srcColumn));
        while (stack.Count > 0)
        {
            var currPoint = stack.Pop();
            image[currPoint.row][currPoint.column] = newColor;
            // 遍历四个方向，查找是否有颜色相同的点
            foreach (var direction in directions)
            {
                var newRow = currPoint.row + direction[0];
                var newColumn = currPoint.column + direction[1];

                if (newRow >= 0 && newRow < image.Length             // 行索引在数组范围内
                    && newColumn >= 0 && newColumn < image[0].Length // 列索引在数组范围内
                    && image[newRow][newColumn] == originColor)      // 当前点颜色与初始点颜色相同
                {
                    stack.Push((newRow, newColumn));
                }
            }
        }
        return image;
    }
}
```

#### 复杂度分析

两种方法复杂度一样

时间复杂度：O(n×m)，其中 n 和 m 分别是二维数组的行数和列数。最坏情况下需要遍历所有的方格一次。

空间复杂度：O(n×m)，其中 n 和 m 分别是二维数组的行数和列数。主要为队列或栈空间的开销。

### [695. 岛屿的最大面积](https://leetcode-cn.com/problems/max-area-of-island/)

#### 题目

给你一个大小为 m x n 的二进制矩阵 grid 。

岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。

岛屿的面积是岛上值为 1 的单元格的数目。

计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。

**示例 1：**

![img](Leetcode算法入门.assets/maxarea1-grid.jpg)

```
输入：grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
输出：6
解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
```

**示例 2：**

```
输入：grid = [[0,0,0,0,0,0,0,0]]
输出：0
```

**提示：**

- m == grid.length

- n == grid[i].length

- 1 <= m, n <= 50

- `grid[i][j]` 为 0 或 1

#### 题解

深度优先搜索解法

```C#
public class Solution
{
    public int MaxAreaOfIsland(int[][] grid)
    {
        var maxArea = 0;
        // 遍历每一个坐标
        for (int i = 0; i < grid.Length; i++)
        {
            for (int j = 0; j < grid[0].Length; j++)
            {
                maxArea = Math.Max(maxArea, GetArea(grid, i, j));
            }
        }
        return maxArea;
    }

    private int GetArea(int[][] grid, int row, int column)
    {
        var area = 0;
        // 当前坐标在数组范围内，并且值为1
        if (row >= 0 && row < grid.Length
            && column >= 0 && column < grid[0].Length
            && grid[row][column] == 1)
        {
            // 将搜索过的岛屿置0，防止重复搜索
            grid[row][column] = 0;
            area = 1;
            // 四个方向
            area += GetArea(grid, row - 1, column);
            area += GetArea(grid, row, column + 1);
            area += GetArea(grid, row + 1, column);
            area += GetArea(grid, row, column - 1);
        }
        return area;
    }
}
```

广度优先搜索解法

```C#
public class Solution
{
    public int MaxAreaOfIsland(int[][] grid)
    {
        var maxArea = 0;
        // 左上右下四个方向单次偏移量
        var directions = new (int row, int column)[] { (-1, 0), (0, 1), (1, 0), (0, -1) };
        // 遍历每一个坐标
        for (int i = 0; i < grid.Length; i++)
        {
            for (int j = 0; j < grid[0].Length; j++)
            {
                var currArea = 0;
                var queue = new Queue<(int row, int column)>();
                // 当前遍历到的坐标 作为起始坐标入队
                queue.Enqueue((i, j));
                while (queue.Count > 0)
                {
                    var point = queue.Dequeue();
                    // 如果从队列中取出的坐标值为1，则将其置0（防止重复遍历），且面积加1，然后将周围坐标入队
                    // 否则重新从队列中取值
                    if (grid[point.row][point.column] == 1)
                    {
                        grid[point.row][point.column] = 0;
                        currArea++;
                    }
                    else
                    {
                        continue;
                    }
                    foreach (var direction in directions)
                    {
                        var row = point.row + direction.row;
                        var column = point.column + direction.column;
                        if (row >= 0 && row < grid.Length
                            && column >= 0 && column < grid[0].Length)
                        {
                            queue.Enqueue((row, column));
                        }
                    }
                }
                maxArea = Math.Max(maxArea, currArea);
            }
        }
        return maxArea;
    }
}
```

#### 复杂度分析

时间复杂度：O(R×C)。其中 R 是给定网格中的行数，C 是列数。我们访问每个网格最多一次。

空间复杂度：O(R×C)，队列中最多会存放所有的土地，土地的数量最多为 R×C 块，因此使用的空间为 O(R×C)。

## 第8天 广度优先搜索 / 深度优先搜索

### [617. 合并二叉树](https://leetcode-cn.com/problems/merge-two-binary-trees/)

#### 题目

给你两棵二叉树： root1 和 root2 。

想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 null 的节点将直接作为新二叉树的节点。

返回合并后的二叉树。

注意: 合并过程必须从两个树的根节点开始。

**示例 1：**

![img](Leetcode算法入门.assets/merge.jpg)

```
输入：root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
输出：[3,4,5,5,4,null,7]
```

**示例 2：**

```
输入：root1 = [1], root2 = [1,2]
输出：[2,2]
```

**提示：**

- 两棵树中的节点数目在范围 [0, 2000] 内

- -10^4^ <= Node.val <= 10^4^

#### 题解

```C#
public class Solution
{
    /// <summary>
    /// DFS递归版本
    /// </summary>
    public TreeNode MergeTrees(TreeNode root1, TreeNode root2)
    {
        if (root1 == null)
        {
            return root2;
        }
        if (root2 == null)
        {
            return root1;
        }
        var ansTree = new TreeNode(root1.val + root2.val);
        ansTree.left = MergeTrees(root1.left, root2.left);
        ansTree.right = MergeTrees(root1.right, root2.right);
        return ansTree;
    }

    /// <summary>
    /// DFS栈版本
    /// </summary>
    public TreeNode MergeTrees1(TreeNode root1, TreeNode root2)
    {
        if (root1 == null)
        {
            return root2;
        }
        if (root2 == null)
        {
            return root1;
        }
        var stack = new Stack<(TreeNode left, TreeNode right)>();
        stack.Push((root1, root2));
        while (stack.Count > 0)
        {
            var (tree1, tree2) = stack.Pop();
            // 将值加到root1上去
            tree1.val += tree2.val;
            // 处理两子树的左边节点
            if (tree1.left is not null && tree2.left is not null)
            {
                // 两左节点都不为空时，入栈
                stack.Push((tree1.left, tree2.left));
            }
            else if (tree1.left is null)
            {
                // tree1左节点为空时，合并后的结果就是tree2左节点
                // tree1右节点为空或者两节点都为空时，合并后的结果就是tree1左节点
                tree1.left = tree2.left;
            }
            // 处理两子树的右边节点，同上
            if (tree1.right is not null && tree2.right is not null)
            {
                stack.Push((tree1.right, tree2.right));
            }
            else if (tree1.right is null)
            {
                tree1.right = tree2.right;
            }
        }
        return root1;
    }
}
```

#### 复杂度分析

时间复杂度：O(min(m,n))，其中 m 和 n 分别是两个二叉树的节点个数。对两个二叉树同时进行搜索，只有当两个二叉树中的对应节点都不为空时才会访问到该节点，因此被访问到的节点数不会超过较小的二叉树的节点数。

空间复杂度：O(min(m,n))，其中 m 和 n 分别是两个二叉树的节点个数。空间复杂度取决于堆栈中的元素个数，堆栈中的元素个数不会超过较小的二叉树的节点数。

### [116. 填充每个节点的下一个右侧节点指针](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)

#### 题目

给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

```
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```

填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。

**示例 1：**

![img](Leetcode算法入门.assets/116_sample.png)

```
输入：root = [1,2,3,4,5,6,7]
输出：[1,#,2,3,#,4,5,6,7,#]
解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
```

**示例 2:**

```
输入：root = []
输出：[]
```

**提示：**

- 树中节点的数量在 [0, 2^12^ - 1] 范围内

- -1000 <= node.val <= 1000

**进阶：**

- 你只能使用常量级额外空间。

- 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。

#### 题解

```C#
/*
// Definition for a Node.
public class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
}
*/

public class Solution
{
    public Node Connect(Node root)
    {
        if (root == null)
        {
            return null;
        }
        var queue = new Queue<Node>();
        queue.Enqueue(root);
        while (queue.Count > 0)
        {
            // 记录队列大小，即当前层节点数
            var size = queue.Count;
            Node nextNode = queue.Dequeue();
            for (int i = 0; i < size - 1; i++)
            {
                var currNode = nextNode;
                // 按题要求串联当前层节点
                nextNode = queue.Dequeue();
                currNode.next = nextNode;

                // 把这一层的子树按顺序入队
                if (currNode.left != null)
                {
                    queue.Enqueue(currNode.left);
                }
                if (currNode.right != null)
                {
                    queue.Enqueue(currNode.right);
                }
            }
            // 层的最后一个节点连接Null
            nextNode.next = null;
            if (nextNode.left != null)
            {
                queue.Enqueue(nextNode.left);
            }
            if (nextNode.right != null)
            {
                queue.Enqueue(nextNode.right);
            }
        }
        return root;
    }
}
```

#### 复杂度分析

时间复杂度：O(N)。每个节点会被访问一次且只会被访问一次，即从队列中弹出，并建立 next 指针。

空间复杂度：O(N)。这是一棵完美二叉树，它的最后一个层级包含 N/2 个节点。广度优先遍历的复杂度取决于一个层级上的最大元素数量。这种情况下空间复杂度为 O(N)。

## 第9天  待补充。。。。

## 第12天动态规划

### [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

#### 题目

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

**示例 1：**

```
输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶
```
**示例 2：**

```
输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶
```

提示：

- 1 <= n <= 45

#### 题解

```C#
public class Solution
{
    // 最后一步可能跨了一阶或者两阶，所以动态规划方程如下
    // f(x) = f(x - 1) + f(x - 2)
    public int ClimbStairs(int n)
    {
        if (n < 1) return 0;
        else if (n == 1) return 1;
        else if (n == 2) return 2;

        var prev = 1;
        var curr = 2;
        var result = 2;
        for (int i = 3; i <= n; i++)
        {
            result = curr + prev;
            prev = curr;
            curr = result;
        }
        return result;
    }
}
```

#### 复杂度分析

时间复杂度：循环执行 n 次，每次花费常数的时间代价，故渐进时间复杂度为 O(n)。
空间复杂度：这里只用了常数个变量作为辅助空间，故渐进空间复杂度为 O(1)。

### [198. 打家劫舍](https://leetcode-cn.com/problems/house-robber/)

#### 题目

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

**示例 1：**

```
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

**示例 2：**

```
输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
```

**提示：**

- 1 <= nums.length <= 100

- 0 <= nums[i] <= 400

#### 题解

```C#
public class Solution
{
    // 不能同时偷相邻两个房子，所以偷 x 个房子有两种偷法。
    // 1. 偷前 x - 1 个，最后一个不偷
    // 2. 偷前 x - 2 个，以及最后一个
    // f(x) = Max{ f(x-1), f(x - 2) + Hx }
    public int Rob(int[] nums)
    {
        if (nums == null || nums.Length == 0) return 0;
        else if (nums.Length == 1) return nums[0];

        // 这里展示的是动态规划的一般性解法，实际上不需要用dp数组去存储所有项，
        // 只需要保存两项即可
        var dp = new int[nums.Length];
        dp[0] = nums[0];
        dp[1] = Math.Max(nums[0], nums[1]);
        for (int i = 2; i < nums.Length; i++)
        {
            dp[i] = Math.Max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp.Last();
    }
}
```

#### 复杂度分析

时间复杂度：O(n)

空间复杂度：O(n)，可以优化到O(1)

### [120. 三角形最小路径和](https://leetcode-cn.com/problems/triangle/)

#### 题目

给定一个三角形 triangle ，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。

**示例 1：**

```
输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下面简图所示：
   2
  3 4
 6 5 7
4 1 8 3
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
```

**示例 2：**

```
输入：triangle = [[-10]]
输出：-10
```

**提示：**

- 1 <= triangle.length <= 200

- triangle[0].length == 1

- triangle[i].length == triangle[i - 1].length + 1

- -10^4^ <= `triangle[i][j]` <= 10^4^

**进阶：**

你可以只使用 O(n) 的额外空间（n 为三角形的总行数）来解决这个问题吗？

#### 题解

```C#
public class Solution
{
    // f(0) = triangle[0][0]
    // f(1) = triangle[0][0] + Min { triangle[1][0], triangle[1][1] }
    // 要到达位置 (i,j)，上一步需要在位置 (i - 1, j - 1) 或者 (i - 1, j) 上
    // 状态转移方程 f[i][j]=min(f[i−1][j−1],f[i−1][j])+c[i][j]
    public int MinimumTotal(IList<IList<int>> triangle)
    {
        // 三角形行数与最长行的长度相等
        var length = triangle.Count;
        if (length == 1) return triangle[0][0];
        if (length == 2) return triangle[0][0] + Math.Min(triangle[1][0], triangle[1][1]);

        var dp = new int[length, length];
        dp[0, 0] = triangle[0][0];
        dp[1, 0] = triangle[0][0] + triangle[1][0];
        dp[1, 1] = triangle[0][0] + triangle[1][1];
        // 从第2行，第0列开始遍历
        for (int i = 2; i < length; i++)
        {
            // 第0列为边界条件，单独计算
            dp[i, 0] = dp[i - 1, 0] + triangle[i][0];
            // 注意列号不能超过当前行长度
            for (int j = 1; j < i; j++)
            {
                dp[i, j] = Math.Min(dp[i - 1, j - 1], dp[i -1, j]) + triangle[i][j];
            }
            // 第i列为边界条件，单独计算
            dp[i, i] = dp[i - 1, i - 1] + triangle[i][i];
        }

        //for (int i = 0; i < dp.GetLength(1); i++)
        //{
        //    for (int j = 0; j < i; j++)
        //    {
        //        Console.Write(dp[i, j]);
        //        Console.Write('，');
        //    }
        //    Console.WriteLine(dp[i, i]);
        //}

        var minVal = int.MaxValue;
        for (int i = 0; i < length; i++)
        {
            if (minVal > dp[length - 1, i])
            {
                minVal = dp[length - 1, i];
            }
        }
        return minVal;
    }
}
```

#### 复杂度分析

时间复杂度：O(n^2^)，其中 nn 是三角形的行数。

空间复杂度：O(n^2^)。我们需要一个 n∗n 的二维数组存放所有的状态。

## 第13天 位运算

### [231. 2 的幂](https://leetcode-cn.com/problems/power-of-two/)

#### 题目

给你一个整数 n，请你判断该整数是否是 2 的幂次方。如果是，返回 true ；否则，返回 false 。

如果存在一个整数 x 使得 n == 2^x^ ，则认为 n 是 2 的幂次方。

**提示：**

- -2^31^ <= n <= 2^31^ - 1

**进阶：**你能够不使用循环/递归解决此问题吗？

#### 题解

```C#
public class Solution
{
    public bool IsPowerOfTwo(int n)
    {
        // 100000
        // 011111
        return n > 0 && (n & (n - 1)) == 0;
    }
}
```

#### 复杂度分析

时间复杂度：O(1)。

空间复杂度：O(1)。

### [191. 位1的个数](https://leetcode-cn.com/problems/number-of-1-bits/)

#### 题目

编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为[汉明重量](https://baike.baidu.com/item/汉明重量)）。