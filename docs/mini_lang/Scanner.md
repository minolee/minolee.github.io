# Mini-lang 컴파일러 프로젝트

## 1. Scanner 만들기(1)

프로그램 소스 코드를 인식하기 위해 소스 코드의 각 단어가 어떤 것을 의미하는지를 알아야 합니다. 일단 키워드들은 유한한 문자열이고, 공백으로 분리된 각 단어들은 특정 키워드를 나타내거나, 여러 개의 키워드의 연속으로 이루어져 있다고 볼 수 있습니다.

이 키워드를 인식하기 위해, Regular expression을 인식하는 모듈을 만들어 봅시다.

먼저 프로그램의 근본을 이룰 키워드들의 예시를 들어 봅시다.

```
IF : if
FOR : for
WHILE : while
...
PLUS : +
MINUS : -
...
AND : && | and
...
COMMENT : //^\n*|/\*.*\*/
```

방금 들은 예시들보다 많은 case들이 있을 수 있지만, 일단 이 정도에 필요한 Regex Parser를 만들어야 합니다.
java에는 [Pattern class](https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html)를 통한 Regex를 지원하지만, 본 프로젝트의 컨셉(?)상 이를 직접 파싱해 보도록 하겠습니다.
Regex는 하나의 DFA(Determinisitic Finite Automata)로 나타낼 수 있습니다. 이 과정에서 몇 가지 중간 상태가 있습니다. 먼저, Regex를 epsilon-movement를 허용하는 NFA(Non-deterministic Finite Automata), 즉 e-NFA 로 나타낼 수 있는 알고리즘은 [Thompson's Construction](https://en.wikipedia.org/wiki/Thompson%27s_construction)이 있습니다. 이후에 epsilon-movement를 없애는 과정이 있습니다. 알고리즘의 이름은 나와 있지 않지만, epsilon-closure를 계산한 뒤 하나의 epsilon-closure에서 가능한 모든 transition의 epsilon-closure를 계산하는 것을 반복하는 과정을 거치면 epsilon transition을 없앨 수 있습니다.[참고](https://classes.soe.ucsc.edu/cmps130/Fall10/Handouts/epsNFA.pdf)

실제로 코드를 만들어 봅시다.
먼저, Regex를 e-NFA로 만들어야 합니다. Regex는 하나의 string으로 표현할 수 있지만, e-NFA는 어떻게 표현해야 할까요? 이를 위해 Finite State Automata를 정의해 봅시다.
하나의 State는 다음과 같이 정의할 수 있습니다.
```
public class State {
    private Map<String, List<State>> transition;
    private List<State> epsilonMovement;
    private boolean accepting;
    ...
}
```
Automata는 State들의 집합과, 하나의 Start state, transition function(여기서는 state에 저장되어 있음), Accepting state들의 집합으로 이루어져 있습니다. 위의 state 정의대로라면 하나의 Automaton은 다음과 같이 정의할 수 있겠네요.

```
public class Automaton
{
    private List<State> states;
    private State startState;
)
```

Automaton에 필수적으로 필요할 함수는 하나의 string을 받아서 이 string이 Accepting string인가를 분석하는 것과, Regex를 받아서 하나의 Automaton으로 parse하는 함수가 필요할 것입니다.

```
public boolean accepts(String text)
{
	...
}
...
public static Automaton parseRegex(String regex)
{
	...
}
```

자세한 내용은 다음 포스트에서...


Last edited 2017-08-27

[처음으로](https://minolee.github.io)
[이전글](Description.md)