# Mini-lang 컴파일러 프로젝트

## 3. Keyword 인식기

### Keyword

 Automaton을 이용하여 단어를 인식하는 것을 만들었습니다. 이제 이를 이용하여 character의 연속된 sequence를 keyword의 집합으로 만들어야 합니다.

 지금 keyword regex를 읽으면 총 55개의 regex가 나옵니다. 어떻게 해야 하나의 단어를 적절히 잘라서 올바른 keyword를 부여해야 할 지 생각해 보아야 합니다.

 처음으로 시도해 본 방법은 Alpha-Numeric character를 끝까지 읽은 다음에 해당하는 character를 읽는 것이였습니다. 하지만 이 방법으로는 "abcde"와 같은 string을 읽을 때나, 'c'와 같은 char를 읽을 때 올바르니 못한 결과를 얻을 수 있습니다.

 두 번째 방법은 글자를 하나씩 읽으며 인식하는 Automaton이 나올 떄까지 글자를 추가하는 방법입니다. 이 방법은 ".*"와 같은 string은 잘 읽을 수 있습니다. 하지만 if0와 같은 id를 인식하려 할 때는 if까지 읽은 뒤 <IF> 키워드를 푸시하고, 0을 읽은 뒤 <NUMBER> 키워드를 푸시할 것입니다.

 두 번째 방법을 개선하여 몇 가지 policy를 만들어 보았습니다.
  - 한 글자씩 읽으며 중간에 이미 accept되지 않을 것들(즉, illegal input으로 인식하는 것들)을 걸러낸다.
  - 이번 글자를 읽을 때 accept되는 automaton이 0개일 경우, 직전 상태에서 accept되는 것 중 적절한 것을 골라 keyword에 푸시한다.

 *적절한 것*을 어떻게 골라내야 할 지 고민이 됩니다. 저는 keyword 정의 파일을 만들 때 우선순위가 높은 것을 먼저 등장시킨 뒤, accept목록에서 가장 앞에 있는 automaton을 키워드로 부시하기로 했습니다. if는 <IF>와 <ID>에 동시 만족되는 키워드지만, <IF>가 먼저 등장하므로 if는 <IF>키워드를 가지게 됩니다.

실제 구현은 두 주요 함수로 이루어져 있습니다.
```
public List<Keyword> scan(File file) throws IOException
{
	...
}

public static Scanner readKeywords(String fileName)
{
	...
}
```
scan은 하나의 scanner에서 file을 받아 keyword의 list로 변환해 줍니다. 주석, 공백과 같은 컴파일러가 무시해도 되는 부분은 넘깁니다.

readKeyword는 keyword 정의 파일을 받아서 각각의 keyword에 맞는 automaton list를 가진 scanner를 생성해 줍니다.

### 소스 코드

[링크](https://github.com/minolee/mini_lang/blob/master/src/scanner/Scanner.java)


### 마치며

 테스트 파일로 아래의 텍스트를 사용해 보았습니다. 모든 test case를 가지고 있지는 않지만 꽤나 많은 중요한 case를 포함하고 있습니다.
```
int x ;

for(int i = 0;i < 10;i+= 1)
{
    print(i);
    a += a = a -= a|= a||b<<c < d and b;
    string x = "abcde";
}
//test for a comment -> this should not appear
```
말도 안 되는 코드지만, 중요한 것은 키워드를 잘 뽑아 내는지 테스트를 하는 것이기 때문에 지금 당장은 크게 중요하지 않습니다. 나중에 grammar에서 저 문법이 오류가 있다고 잡아 주면 될 거에요.

꽤 오랫동안 마니막이 <STRING_DATA>(regex 정의로는 ".\*"였습니다.)로 끝나는 일이 지속되었는데, 이 일을 해결하는 데 오래 걸려서 진전이 없었습니다. 코드 부분이 문제가 있는 듯 해서 디버그를 계속 돌려 봐도 문제가 없어서 더 헷갈렸습니다. 정답은 regex 정의를 "(^")"로 바꾸는 것이였습니다...

Last edited 2017-09-04

 - [처음으로](https://minolee.github.io)
 - [이전글](2_Scanner2.md)
