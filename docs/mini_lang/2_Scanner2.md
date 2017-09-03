# Mini-lang 컴파일러 프로젝트

## 2. Scanner 만들기(2)

### Regex 파싱
이전 글에서 보았듯이, 우리에게는 그렇게 많은 Regex 명령어가 필요하지 않습니다.
 - ID를 나타낼 때 쓸 [a-z]와 같은 format
 - 반복을 나타내는 *
 - 특수 문자를 표시하는 \
 - 분기를 나타내는 \|
 - 모든 문자를 나타내는 .
 - ()

이 정도가 필요하겠네요. 하나하나 구현해 봅시다.

먼저, 하나의 Regex string을 받았을 때, 이를 분석하기 쉬운 형태로 만들어 놓아야 합니다. 저는 Binary Tree를 만들어서 관리하기로 했습니다. Binary Tree는 Recursive하게 만들기 아주 적합한 구조이기 때문입니다.

```
class RegexTree
{
    final RegexOperation op; 	// 이 Tree가 어떻게 해석되어야 하는가
    char data; 					// 이 Tree에 담긴 글자 - State의 Transition function
    RegexTree left; 			// 첫 번째 subtree
    RegexTree right; 			// 두 번째 subtree
    String range;				// []에서 쓰일 range가 담긴 곳
}

enum RegexOperation
{
    NONE, OR, REPEAT, RANGE, CONCAT, ALL
}
```
[소스 코드](https://github.com/minolee/mini_lang/blob/master/src/scanner/RegexTree.java)

이제 Regex를 본격적으로 파싱해 봅시다!

하나의 글자를 읽은 다음에, 해당 글자에 맞는 RegexTree를 만들고, 이 데이터를 다음 파싱의 context로 보내는 방식으로 만들어 보았습니다. 왜냐하면 *이나 |과 같은 특수 case는 이전 RegexTree의 데이터를 필요로 하기 때문입니다.
```
private static RegexTree parseRegex(String line, RegexTree context)
```
이 함수는 recursive하기 때문에, base case가 필요합니다. 우리의 base case는 line에 아무것도 남지 않았을 때입니다.
```
if(line.length() == 0) return context;
```
line의 첫 글자를 읽으며 다음과 같은 행동을 합니다.
 - 보통 글자 : 이번 글자를 data로 가진 RegexTree를 만들고, context와 CONCATNATION으로 잇는 하나의 큰 Tree를 만듭니다. 이를 다음 파싱에 context로 전달합니다.
 - \* : REPEAT operation을 가진 tree를 만들고, 직전의 RegexTree를 child로 넣습니다. 이 때, context가 CONCATNATION으로 이루어져 있는 경우는 context의 뒤쪽의 child만 반복해야 합니다.
 - \ : 다음 문자를 하나 더 읽고, 보통 글자와 같이 행동합니다.
 - \| : \|를 기준으로 두 부분으로 나뉘어집니다. \| 이전에 나온 문자들은 이미 파싱이 완료된 상태이므로, 이를 하나의 subtree로 만들고, 나머지 부분을 파싱하여 두 번째 subtree로 만들어 줍니다.
 - . : ALL operation을 가진 tree를 만들어 context로 던져줍니다.
 - () : ( 에 맞는 )를 찾아준 후, 이 사이에 있는 string을 파싱한 결과를 반환합니다.
 - [] : ()와 같이 [의 짝을 찾아주고, 사이의 substring을 range에 넣습니다.

이에 맞춰 parseRegex 함수를 업데이트 해 봅시다.
```
private static RegexTree parseRegex(String line, RegexTree context)
{
	char start = line.charAt(0);	// 이번 iteration에 읽을 글자
	RegexTree regexTree;			// 이번 iteration에서 만들어질 tree
	int readlen;					// 이번 iteration에서 읽은 문자열의 길이
	switch(start)
	{
		...
	}
	return parseRegex(line.substring(readlen), regexTree);
}
```

이 과정을 거치면 성공적으로 Regex를 tree 구조로 만들 수 있습니다.

### Regex tree에서 Automaton으로 변환하기

이제 RegexTree를 가지고 이에 맞는 Automaton을 만들어 봅시다.

아까도 말했듯이, Tree 구조를 선택한 이유는 recursive하게 만들기가 좋아서입니다. 이번에도 그 장점을 발휘할 수 있습니다. subtree들을 모두 Automaton으로 만들어 주고, 현재 tree의 operation에 따라 후처리를 하는 방식으로 만들 수 있습니다.

```
private static Automaton interpretRegexTree(RegexTree tree)
{
	Automaton result = new Automaton();				// 반환할 Automaton의 skeleton
	State start = new State(isAccepting : false);	// 반환한 Automaton의 시작 state
	State end = new State(isAccepting : true);		// 반환할 Automaton의 final state
	switch(tree.op)
	{
		...
	}
	return result;
}
```
여러 가지 operation에 대한 변환은 저번 포스트에 올렸던 [Thompson's Construction](https://en.wikipedia.org/wiki/Thompson%27s_construction)을 따라서 만들면 쉽습니다. 톰슨 아저씨의 방법에 나와 있지 않은 두 case에 대해서는 다음과 같은 방법으로 할 수 있습니다.
 - [] : []안에 있는 range를 분석해서 어떤 character가 포함되어 있는지 분석하고, 이에 맞는 character를 모두 transition function에 등록합니다.
 - . : 이 부분이 좀 애매한데, 어떤 input이 들어올지 알 수 없으므로 special case를 만듭니다. 저는 "ANY" 라는 function을 등록해 놓고, 어떤 input이 들어도든 null만 아니면 ANY로 갈 수 있는 state들을 transition result에 포함시키는 방법으로 구현하였습니다.

이런 방식으로 recursive하게 구현하면 regex를 성공적으로 e-NFA로 만들 수 있습니다!

### 마치며
(사실 쓰다가 많이 귀찮아졌습니다)

옛날에 오토마타 프로젝트때 하던 것을 거의 그대로 반복하는 기분이네요...

원래 single line comment는 //(^\n)*과 같은 식으로 (~~를 빼고 전부) 라는 형식의 regular expression을 만드려 했습니다. 하지만 ^의 범위가 굉장히 애매하고, ^ 다음에 괄호가 오는 상황이라던지, ^ 다음에 []가 오는 상황이라던지를 고려해 보았을 때 그 복잡성이 엄청나게 증가하는 느낌이 들어서 일단 문법을 수정하는 방향으로 가 보기로 했습니다. 어쩌면 나중에 프로그램 구조 파싱할 때 이 부분 때문에 걸려서 수정하게 될지도 모르겠네요.

뭔가 글을 쓰면서 설명충이 된 기분인데, 원래 목적은 설명을 하려는게 아니라 간단한 후기 정도만 남기려고 했던 것이 점점 길어져서 이렇게 되고 있습니다. 

### 소스 코드 링크

[link](https://github.com/minolee/mini_lang/blob/master/src/scanner/Automaton.java)

Last edited 2017-08-30

 - [처음으로](https://minolee.github.io)
 - [이전글](1_Scanner1.md)
 - [다음글](3_Keyword.md)