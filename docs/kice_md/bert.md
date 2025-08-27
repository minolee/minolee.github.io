# BERT 이후 언어모델의 발전: 인코더-디코더 기반 vs. 디코더 전용 모델

BERT(2018) 이후 자연어 처리 분야에는 **트랜스포머** 기반의 대규모 언어 모델(LLM)들이 빠르게 발전했습니다. 전체적으로 모델 구조에 따라 **인코더-디코더** 구조를 활용한 모델과, **디코더**만 사용하는 (GPT 계열로 대표되는) 모델로 나눌 수 있습니다. 아래에서는 각 주요 모델의 **발표 연도**, **모델 구조**, **주요 특징**(이전 대비 개선점 및 아키텍처/학습 방식의 차별점), 그리고 **대표 논문 또는 발표 기관**을 정리합니다.

## 인코더-디코더 구조 기반 언어 모델

### BERT (2018년)

- **모델 구조:** 트랜스포머 **인코더** 기반 (양방향 Encoder-only 구조)[\[1\]](https://en.wikipedia.org/wiki/BERT_%28language_model%29#:~:text=Bidirectional%20encoder%20representations%20from%20transformers,3).
- **주요 특징:** 구글이 발표한 **Bidirectional Encoder Representations from Transformers** 모델로, 문장 내 **마스크된 단어 예측(Masked Language Modeling)**과 **다음 문장 예측** 과제를 통해 사전 학습되었습니다. 이를 통해 단어의 좌우 맥락을 모두 고려한 **문맥 표현**을 학습하여 당시 자연어 처리 **최첨단 성능**을 크게 향상시켰습니다[\[1\]](https://en.wikipedia.org/wiki/BERT_%28language_model%29#:~:text=Bidirectional%20encoder%20representations%20from%20transformers,3)[\[2\]](https://en.wikipedia.org/wiki/BERT_%28language_model%29#:~:text=BERT%20is%20trained%20by%20masked,3). BERT는 이전의 단방향 언어모델보다 풍부한 언어 이해 능력을 보여주며, 2020년 즈음에는 NLP 과제의 사실상 **기준 모델**로 활용될 만큼 널리 쓰였습니다[\[1\]](https://en.wikipedia.org/wiki/BERT_%28language_model%29#:~:text=Bidirectional%20encoder%20representations%20from%20transformers,3). 다만 **텍스트 생성 능력은 없고** 인코더 출력에 기반한 분류나 추출에 주로 사용됩니다[\[3\]](https://en.wikipedia.org/wiki/BERT_%28language_model%29#:~:text=However%20it%20comes%20at%20a,if%20one%20wishes%20to%20use).
- **대표 논문/기관:** 2018년 구글 AI가 발표한 논문 _“BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding”_[\[1\]](https://en.wikipedia.org/wiki/BERT_%28language_model%29#:~:text=Bidirectional%20encoder%20representations%20from%20transformers,3).

### T5 (2019년)

- **모델 구조:** 트랜스포머 **인코더-디코더** 구조[\[4\]](https://en.wikipedia.org/wiki/T5_%28language_model%29#:~:text=T5%20%28Text,decoder%20generates%20the%20output%20text).
- **주요 특징:** 구글이 개발한 **Text-to-Text Transfer Transformer**로, **모든 NLP 과제를 “텍스트 → 텍스트” 형식**으로 통일하여 다룬 점이 가장 큰 혁신입니다[\[5\]](https://research.google/blog/exploring-transfer-learning-with-t5-the-text-to-text-transfer-transformer/#:~:text=A%20Shared%20Text). 예를 들어 번역, 요약, 질의응답, 분류 등의 과제를 모두 입력 텍스트를 받아 **출력 텍스트를 생성**하는 형태로 변환했습니다. 이러한 **통합적 프레임워크** 덕분에 하나의 모델과 학습 방법으로 다양한 작업에 적용할 수 있었고[\[5\]](https://research.google/blog/exploring-transfer-learning-with-t5-the-text-to-text-transfer-transformer/#:~:text=A%20Shared%20Text), 대규모 **웹 텍스트 코퍼스 C4**로 사전훈련하여 많은 벤치마크에서 당시 최고 성능을 달성했습니다[\[6\]](https://research.google/blog/exploring-transfer-learning-with-t5-the-text-to-text-transfer-transformer/#:~:text=In%20%E2%80%9CExploring%20the%20Limits%20of,and%20reproduced%2C%20we%20provide%20the)[\[5\]](https://research.google/blog/exploring-transfer-learning-with-t5-the-text-to-text-transfer-transformer/#:~:text=A%20Shared%20Text). 원 논문에서는 파라미터 규모를 Small부터 11억(11B)까지 다섯 가지로 확장하며 **모델 크기 증가에 따른 성능 향상**도 체계적으로 분석했습니다.
- **대표 논문/기관:** 2019년 구글 연구진이 발표한 논문 _“Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer”_ (T5 논문)[\[6\]](https://research.google/blog/exploring-transfer-learning-with-t5-the-text-to-text-transfer-transformer/#:~:text=In%20%E2%80%9CExploring%20the%20Limits%20of,and%20reproduced%2C%20we%20provide%20the).

### BART (2019년)

- **모델 구조:** 트랜스포머 **인코더-디코더** 구조. (인코더는 BERT와 유사한 **양방향 인코더**, 디코더는 GPT와 유사한 **자동회귀 디코더**로 구성)[\[7\]](https://www.geeksforgeeks.org/artificial-intelligence/bart-model-for-text-auto-completion-in-nlp/#:~:text=Report)[\[8\]](https://www.geeksforgeeks.org/artificial-intelligence/bart-model-for-text-auto-completion-in-nlp/#:~:text=As%20BART%20is%20an%20autoencoder,1%20model).
- **주요 특징:** 페이스북 AI(현재 Meta)에서 개발한 **Bidirectional and Auto-Regressive Transformer** 모델입니다. **텍스트 디노이징(autoencoder)** 방식의 사전훈련을 도입했는데, 임의로 문장을 훼손(단어 마스크/순서 섞기 등)한 후 원문을 복원하도록 학습시켰습니다[\[9\]](https://www.geeksforgeeks.org/artificial-intelligence/bart-model-for-text-auto-completion-in-nlp/#:~:text=Denoising%20autoencoder)[\[8\]](https://www.geeksforgeeks.org/artificial-intelligence/bart-model-for-text-auto-completion-in-nlp/#:~:text=As%20BART%20is%20an%20autoencoder,1%20model). 이를 통해 **BERT의 이해력**(인코더의 문맥 파악)과 **GPT의 생성력**(디코더의 언어 생성)을 하나의 모델에 통합하여, 텍스트 **이해와 생성 양면에서 뛰어난 성능**을 보였습니다[\[10\]](https://www.analyticsvidhya.com/blog/2024/11/bart-model/#:~:text=What%20is%20BART%3F)[\[7\]](https://www.geeksforgeeks.org/artificial-intelligence/bart-model-for-text-auto-completion-in-nlp/#:~:text=Report). BART는 특히 **요약** 등의 생성 작업에서 당시 최고 수준 성능을 기록했으며[\[11\]](https://www.researchgate.net/publication/343301801_BART_Denoising_Sequence-to-Sequence_Pre-training_for_Natural_Language_Generation_Translation_and_Comprehension#:~:text=BART%3A%20Denoising%20Sequence,art%20on%20news%20benchmarks), 비교적 적은 양의 지도 데이터로도 쉽게 파인튜닝되어 다양한 다운스트림 작업에 활용될 수 있음을 보였습니다[\[12\]](https://www.geeksforgeeks.org/artificial-intelligence/bart-model-for-text-auto-completion-in-nlp/#:~:text=BART%20stands%20for%20Bidirectional%20and,specific%20tasks).
- **대표 논문/기관:** 2019년 페이스북 AI가 발표한 논문 _“BART: Denoising Sequence-to-Sequence Pre-training for Natural Language Generation, Translation, and Comprehension”_[\[12\]](https://www.geeksforgeeks.org/artificial-intelligence/bart-model-for-text-auto-completion-in-nlp/#:~:text=BART%20stands%20for%20Bidirectional%20and,specific%20tasks).

_(이 외에도, RoBERTa(2019, Facebook)의 경우 BERT의 사전훈련 절차를 개선하여 더 많은 데이터와 배치로 학습시켜 성능을 높였고, ALBERT(2019, Google)는 파라미터 공유 등으로 경량화한 BERT 변형 등 여러 파생 연구들이 등장했습니다.)_

## 디코더 전용(Decoder-only) 언어 모델

### GPT (2018년)

- **모델 구조:** 트랜스포머 **디코더** 기반 (좌측에서 우측으로 단방향 생성 모델)[\[2\]](https://en.wikipedia.org/wiki/BERT_%28language_model%29#:~:text=BERT%20is%20trained%20by%20masked,3).
- **주요 특징:** OpenAI에서 발표한 **Generative Pre-Trained Transformer**는 **대용량 텍스트에 대한 자가지도 사전학습**(다음 단어 예측)을 최초로 트랜스포머에 적용한 언어모델입니다. 2018년 논문 _“Improving Language Understanding by Generative Pre-Training”_에서 소개된 GPT는 **BooksCorpus** 같은 방대한 텍스트로 사전 학습을 한 뒤, 이를 기반으로 각종 NLP 과제에 파인튜닝하는 **반지도학습** 접근을 제시했습니다[\[13\]](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer#:~:text=In%20June%202018%2C%20OpenAI%20,consuming%20to%20create.%5B%2011). 이 방식은 과거 일일이 레이블된 데이터로 훈련하던 방법보다 적은 지도데이터로도 우수한 성능을 얻어 **자연어 이해 성능 향상에 기여**했고, 이후 대규모 언어모델 시대를 여는 계기가 되었습니다[\[13\]](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer#:~:text=In%20June%202018%2C%20OpenAI%20,consuming%20to%20create.%5B%2011). (GPT-1 모델 파라미터는 약 1억 1천만 개 수준이었습니다.)
- **대표 논문/기관:** 2018년 OpenAI 기술 보고서 _“Improving Language Understanding by Generative Pre-Training”_[\[13\]](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer#:~:text=In%20June%202018%2C%20OpenAI%20,consuming%20to%20create.%5B%2011).

### GPT-2 (2019년)

- **모델 구조:** 트랜스포머 **디코더** 기반.
- **주요 특징:** OpenAI의 GPT 후속 모델로 **모델 크기와 데이터 규모를 대폭 확장**했습니다. GPT-2는 약 **15억 파라미터**로 GPT-1 대비 10배 이상 크며, **약 40GB 분량의 웹 텍스트(WebText)**로 사전 학습되었습니다[\[14\]](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer#:~:text=OpenAI%20followed%20this%20with%20GPT,12%20%5D%20In%202020). 그 결과 이전보다 훨씬 유창하고 긴 텍스트 생성이 가능해졌고, 사전 학습만으로도 질문 답변, 번역 등 다양한 작업에 **제로샷 학습능력**을 일부 보여주었습니다. OpenAI는 GPT-2의 강력한 텍스트 생성력이 **악용 위험**이 있을 수 있다고 보고 처음에는 전체 모델을 즉시 공개하지 않고 **단계적 공개(staged release)** 전략을 취하기도 했습니다[\[14\]](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer#:~:text=OpenAI%20followed%20this%20with%20GPT,12%20%5D%20In%202020). 최종적으로 2019년 말에야 15억 매개변수 모델이 공개되었습니다. GPT-2의 등장은 대형 언어모델의 **규모 확장이 곧 성능 향상**으로 이어짐을 드러낸 사례로 평가받습니다.
- **대표 논문/기관:** 2019년 OpenAI 발표 (기술 보고서 _“Language Models are Unsupervised Multitask Learners”_ 및 OpenAI 블로그).

### GPT-3 (2020년)

- **모델 구조:** 트랜스포머 **디코더** 기반.
- **주요 특징:** OpenAI의 GPT-3는 **총 1,750억 개**의 파라미터를 갖춘 거대한 언어모델로, 이전보다 두 자릿수 이상 규모를 키웠습니다. 인터넷 텍스트를 포함한 더욱 방대한 데이터로 학습한 GPT-3는 **사전 학습만으로도** 새로운 작업에 대한 **Few-shot/Zero-shot 학습 능력**을 보여주어 크게 주목받았습니다[\[15\]](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer#:~:text=GPT,13). 예를 들어, 몇 가지 예시 문장을 프롬프트에 제공하는 것만으로 번역이나 요약 같은 작업을 별도 파인튜닝 없이 수행해낸 것입니다. 이는 모델의 **범용 언어 이해 및 생성 능력**이 비약적으로 향상되었음을 의미하며, GPT-3 발표 이후 **프롬프트를 통한 활용**이 새로운 패러다임으로 떠올랐습니다[\[15\]](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer#:~:text=GPT,13). 다만 GPT-3 모델은 매우 크기 때문에 추론 비용이 높고, 여전히 환각 등의 한계도 지니고 있습니다.
- **대표 논문/기관:** 2020년 OpenAI 논문 _“Language Models are Few-Shot Learners”_ (NeurIPS 2020)[\[15\]](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer#:~:text=GPT,13).

### GPT-4 (2023년)

- **모델 구조:** 트랜스포머 **디코더** 기반 **멀티모달** 모델.
- **주요 특징:** GPT-4는 OpenAI가 2023년에 공개한 GPT 시리즈의 네번째 모델로, **이미지와 텍스트 입력을 모두 처리**할 수 있는 **멀티모달** 능력을 갖춘 것이 가장 큰 특징입니다[\[16\]](https://techcrunch.com/2023/03/14/openai-releases-gpt-4-ai-that-it-claims-is-state-of-the-art/#:~:text=GPT,was%20around%20the%20bottom%2010). 텍스트 생성 출력의 품질도 향상되어, 전문 자격시험에서 상위 10%에 해당하는 점수를 받을 만큼 **여러 분야에서 인간 수준 성능**을 보였다고 보고되었습니다[\[16\]](https://techcrunch.com/2023/03/14/openai-releases-gpt-4-ai-that-it-claims-is-state-of-the-art/#:~:text=GPT,was%20around%20the%20bottom%2010). OpenAI는 GPT-4를 개발하며 약 6개월간 다양한 **적대적 테스트와 인간 피드백 강화학습(RLHF)**을 거쳐 이전보다 사실성, 조율 가능성, 안전성 측면에서 **개선된 모델**을 내놓았다고 밝혔습니다[\[17\]](https://techcrunch.com/2023/03/14/openai-releases-gpt-4-ai-that-it-claims-is-state-of-the-art/#:~:text=contrast%2C%20GPT,the%20bottom%2010)[\[18\]](https://techcrunch.com/2023/03/14/openai-releases-gpt-4-ai-that-it-claims-is-state-of-the-art/#:~:text=OpenAI%20spent%20six%20months%20%E2%80%9Citeratively,as%20data%20that%20OpenAI%20licensed). GPT-4는 출시 직후 마이크로소프트 Bing 챗봇 등에 활용되었으며, GPT-3.5 기반 ChatGPT보다도 **창의적이고 복잡한 요청**에 더 잘 대응할 수 있는 모델로 평가됩니다[\[19\]](https://techcrunch.com/2023/03/14/openai-releases-gpt-4-ai-that-it-claims-is-state-of-the-art/#:~:text=the%20Azure%20cloud%2C%20which%20was,4)[\[16\]](https://techcrunch.com/2023/03/14/openai-releases-gpt-4-ai-that-it-claims-is-state-of-the-art/#:~:text=GPT,was%20around%20the%20bottom%2010). (구체적인 파라미터 수나 아키텍처 세부사항은 비공개입니다.)
- **대표 논문/기관:** 2023년 OpenAI 기술 보고서 _“GPT-4 Technical Report”_ 및 OpenAI (마이크로소프트와 공동연구)[\[20\]](https://en.wikipedia.org/wiki/GPT-4#:~:text=Generative%20Pre,14%29%20Preview%20release)[\[16\]](https://techcrunch.com/2023/03/14/openai-releases-gpt-4-ai-that-it-claims-is-state-of-the-art/#:~:text=GPT,was%20around%20the%20bottom%2010).

### LLaMA (2023년)

- **모델 구조:** 트랜스포머 **디코더** 기반.
- **주요 특징:** **Large Language Model Meta AI**의 약자인 LLaMA는 Meta(구 페이스북)가 2023년 공개한 **대형 언어모델 계열**입니다. 2023년 2월 첫 버전(LLaMA 1)이 발표되었으며, 연구 목적으로 **7억~650억** 파라미터 규모의 여러 모델 변수를 함께 제공한 것이 특징입니다[\[21\]](https://en.wikipedia.org/wiki/LLaMA#:~:text=Llama%20,3). LLaMA는 비교적 **소규모 파라미터로도 우수한 성능**을 내는 효율적인 모델로 알려졌는데, 특히 최대 모델인 650억은 구글 PaLM(5400억)이나 딥마인드 Chinchilla 등 당대 최고 성능 모델들과 **견줄만한 성능**을 보였다고 보고되었습니다[\[22\]](https://en.wikipedia.org/wiki/LLaMA#:~:text=and%20the%20largest%2065B%20model,19). 모델 가중치가 연구자들에게 공개되어 이후 Alpaca 등 **파인튜닝된 오픈소스 모델들의 등장**을 촉발했고, 2023년 7월에는 상업적 사용이 가능한 LLaMA 2가 공개되는 등 개방형 LLM 발전에 큰 영향을 주었습니다.
- **대표 논문/기관:** 2023년 Meta AI 기술 보고서 _“LLaMA: Open and Efficient Foundation Language Models”_[\[22\]](https://en.wikipedia.org/wiki/LLaMA#:~:text=and%20the%20largest%2065B%20model,19).

### Claude (2023년)

- **모델 구조:** 트랜스포머 **디코더** 기반.
- **주요 특징:** **Anthropic**사가 2023년 3월에 처음 공개한 **Claude**는 ChatGPT의 경쟁자로 알려진 대화형 LLM입니다[\[23\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=Claude%20is%20a%20family%20of,was%20released%20in%20March%202023). OpenAI 출신들이 세운 Anthropic은 **AI의 안전성과 alignmen​t**에 중점을 두고 있으며, Claude에는 사람의 피드백에 의존하지 않고 AI 스스로 윤리 기준에 따라 답변을 개선하도록 하는 **“컨스티튜셔널 AI(헌법 기반 AI)”** 학습 접근이 도입되었습니다[\[24\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=Claude%20models%20are%20generative%20pre,5)[\[25\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=Constitutional%20%20AI%20is%20an,8). 구체적으로 헌법 역할을 하는 **75개 원칙**에 따라 모델이 자기 응답을 평가·수정하도록 한 뒤, 이러한 AI-피드백 데이터로 다시 모델을 강화학습시켜 **유해하거나 편향된 출력을 줄이는** 방식입니다[\[26\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=Constitutional%20%20AI%20is%20an,8)[\[27\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=this%20constitution,generated.%5B%206). Claude는 또한 **긴 문맥 처리**에 강점이 있어, **최대 10만 토큰 이상의 컨텍스트**를 처리할 수 있는 버전을 제공하여 장문의 문서 요약/분석 등에 활용될 수 있음을 선보였습니다[\[28\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=Claude%20was%20released%20as%20two,21)[\[29\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=selected%20users%20approved%20by%20Anthropic.,22). 2023년 출시 이후 Claude는 지속적으로 개선된 버전(Claude 2, Claude 2.1 등)을 내놓고 있으며, 안전하면서도 유용한 AI 비서를 목표로 하는 Anthropic사의 대표 모델입니다.
- **대표 논문/기관:** 2023년 Anthropic에서 공개 (논문 _“Constitutional AI: Harmlessness from AI Feedback”_, 헌법 기반 학습 기법 소개)[\[26\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=Constitutional%20%20AI%20is%20an,8), Anthropic Claude 모델 시리즈[\[23\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=Claude%20is%20a%20family%20of,was%20released%20in%20March%202023).

[\[1\]](https://en.wikipedia.org/wiki/BERT_%28language_model%29#:~:text=Bidirectional%20encoder%20representations%20from%20transformers,3) [\[2\]](https://en.wikipedia.org/wiki/BERT_%28language_model%29#:~:text=BERT%20is%20trained%20by%20masked,3) [\[3\]](https://en.wikipedia.org/wiki/BERT_%28language_model%29#:~:text=However%20it%20comes%20at%20a,if%20one%20wishes%20to%20use) BERT (language model) - Wikipedia

[https://en.wikipedia.org/wiki/BERT_(language_model)](https://en.wikipedia.org/wiki/BERT_%28language_model%29)

[\[4\]](https://en.wikipedia.org/wiki/T5_%28language_model%29#:~:text=T5%20%28Text,decoder%20generates%20the%20output%20text) T5 (language model) - Wikipedia

[https://en.wikipedia.org/wiki/T5_(language_model)](https://en.wikipedia.org/wiki/T5_%28language_model%29)

[\[5\]](https://research.google/blog/exploring-transfer-learning-with-t5-the-text-to-text-transfer-transformer/#:~:text=A%20Shared%20Text) [\[6\]](https://research.google/blog/exploring-transfer-learning-with-t5-the-text-to-text-transfer-transformer/#:~:text=In%20%E2%80%9CExploring%20the%20Limits%20of,and%20reproduced%2C%20we%20provide%20the) Exploring Transfer Learning with T5: the Text-To-Text Transfer Transformer

<https://research.google/blog/exploring-transfer-learning-with-t5-the-text-to-text-transfer-transformer/>

[\[7\]](https://www.geeksforgeeks.org/artificial-intelligence/bart-model-for-text-auto-completion-in-nlp/#:~:text=Report) [\[8\]](https://www.geeksforgeeks.org/artificial-intelligence/bart-model-for-text-auto-completion-in-nlp/#:~:text=As%20BART%20is%20an%20autoencoder,1%20model) [\[9\]](https://www.geeksforgeeks.org/artificial-intelligence/bart-model-for-text-auto-completion-in-nlp/#:~:text=Denoising%20autoencoder) [\[12\]](https://www.geeksforgeeks.org/artificial-intelligence/bart-model-for-text-auto-completion-in-nlp/#:~:text=BART%20stands%20for%20Bidirectional%20and,specific%20tasks) BART Model for Text Auto Completion in NLP - GeeksforGeeks

<https://www.geeksforgeeks.org/artificial-intelligence/bart-model-for-text-auto-completion-in-nlp/>

[\[10\]](https://www.analyticsvidhya.com/blog/2024/11/bart-model/#:~:text=What%20is%20BART%3F) Guide to BART (Bidirectional & Autoregressive Transformer) - Analytics Vidhya

<https://www.analyticsvidhya.com/blog/2024/11/bart-model/>

[\[11\]](https://www.researchgate.net/publication/343301801_BART_Denoising_Sequence-to-Sequence_Pre-training_for_Natural_Language_Generation_Translation_and_Comprehension#:~:text=BART%3A%20Denoising%20Sequence,art%20on%20news%20benchmarks) BART: Denoising Sequence-to-Sequence Pre-training for Natural ...

<https://www.researchgate.net/publication/343301801_BART_Denoising_Sequence-to-Sequence_Pre-training_for_Natural_Language_Generation_Translation_and_Comprehension>

[\[13\]](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer#:~:text=In%20June%202018%2C%20OpenAI%20,consuming%20to%20create.%5B%2011) [\[14\]](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer#:~:text=OpenAI%20followed%20this%20with%20GPT,12%20%5D%20In%202020) [\[15\]](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer#:~:text=GPT,13) Generative pre-trained transformer - Wikipedia

<https://en.wikipedia.org/wiki/Generative_pre-trained_transformer>

[\[16\]](https://techcrunch.com/2023/03/14/openai-releases-gpt-4-ai-that-it-claims-is-state-of-the-art/#:~:text=GPT,was%20around%20the%20bottom%2010) [\[17\]](https://techcrunch.com/2023/03/14/openai-releases-gpt-4-ai-that-it-claims-is-state-of-the-art/#:~:text=contrast%2C%20GPT,the%20bottom%2010) [\[18\]](https://techcrunch.com/2023/03/14/openai-releases-gpt-4-ai-that-it-claims-is-state-of-the-art/#:~:text=OpenAI%20spent%20six%20months%20%E2%80%9Citeratively,as%20data%20that%20OpenAI%20licensed) [\[19\]](https://techcrunch.com/2023/03/14/openai-releases-gpt-4-ai-that-it-claims-is-state-of-the-art/#:~:text=the%20Azure%20cloud%2C%20which%20was,4) OpenAI releases GPT-4, a multimodal AI that it claims is state-of-the-art | TechCrunch

<https://techcrunch.com/2023/03/14/openai-releases-gpt-4-ai-that-it-claims-is-state-of-the-art/>

[\[20\]](https://en.wikipedia.org/wiki/GPT-4#:~:text=Generative%20Pre,14%29%20Preview%20release) GPT-4 - Wikipedia

<https://en.wikipedia.org/wiki/GPT-4>

[\[21\]](https://en.wikipedia.org/wiki/LLaMA#:~:text=Llama%20,3) [\[22\]](https://en.wikipedia.org/wiki/LLaMA#:~:text=and%20the%20largest%2065B%20model,19) Llama (language model) - Wikipedia

<https://en.wikipedia.org/wiki/LLaMA>

[\[23\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=Claude%20is%20a%20family%20of,was%20released%20in%20March%202023) [\[24\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=Claude%20models%20are%20generative%20pre,5) [\[25\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=Constitutional%20%20AI%20is%20an,8) [\[26\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=Constitutional%20%20AI%20is%20an,8) [\[27\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=this%20constitution,generated.%5B%206) [\[28\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=Claude%20was%20released%20as%20two,21) [\[29\]](https://en.wikipedia.org/wiki/Claude_%28language_model%29#:~:text=selected%20users%20approved%20by%20Anthropic.,22) Claude (language model) - Wikipedia

[https://en.wikipedia.org/wiki/Claude_(language_model)](https://en.wikipedia.org/wiki/Claude_%28language_model%29)

| 연도       | 모델             | 구조              | 주요 특징                                                    | 기관/논문                                                                                        |
| -------- | -------------- | --------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **2018** | **BERT**       | Encoder-only    | Masked LM, NSP 과제 / 양방향 문맥 이해 / NLP 벤치마크 혁신              | Google (*BERT: Pre-training of Deep Bidirectional Transformers*)                             |
| **2018** | **GPT-1**      | Decoder-only    | Generative Pre-Training / BooksCorpus 기반 / 파인튜닝 중심       | OpenAI (*Improving Language Understanding by Generative Pre-Training*)                       |
| **2019** | **RoBERTa**    | Encoder-only    | NSP 제거, 대규모 데이터·배치 / BERT 학습 최적화                         | Facebook (*RoBERTa: A Robustly Optimized BERT Pretraining Approach*)                         |
| **2019** | **ALBERT**     | Encoder-only    | 파라미터 공유·Factorized Embedding으로 경량화 / 성능 유지               | Google/TTI-Chicago (*A Lite BERT for Self-supervised Learning*)                              |
| **2019** | **SpanBERT**   | Encoder-only    | Span 단위 마스킹 / 관계 추출·QA 성능 강화                             | Facebook (*SpanBERT: Improving Pre-training by Representing and Predicting Spans*)           |
| **2019** | **GPT-2**      | Decoder-only    | 15억 파라미터 / 대규모 웹 텍스트 학습 / Zero-shot 능력 초기 관찰             | OpenAI (*Language Models are Unsupervised Multitask Learners*)                               |
| **2019** | **T5**         | Encoder-Decoder | 모든 태스크를 “Text-to-Text”로 통합 / C4 데이터셋 활용                  | Google (*Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer*) |
| **2019** | **BART**       | Encoder-Decoder | Denoising Autoencoder / BERT+GPT 융합적 구조 / 생성·이해 모두 강점    | Facebook (*BART: Denoising Sequence-to-Sequence Pre-training*)                               |
| **2020** | **ELECTRA**    | Encoder-only    | Replaced Token Detection (RTD) / 더 적은 자원으로 BERT 이상 성능    | Google (*ELECTRA: Pre-training Text Encoders as Discriminators*)                             |
| **2020** | **GPT-3**      | Decoder-only    | 175B 파라미터 / Few-shot·Zero-shot 학습 / 프롬프트 기반 활용 확산        | OpenAI (*Language Models are Few-Shot Learners*)                                             |
| **2021** | **Gopher**     | Decoder-only    | 280B 파라미터 / 전문 지식 과제 성능 향상                               | DeepMind (*Scaling Language Models: Methods, Analysis & Insights*)                           |
| **2022** | **Chinchilla** | Decoder-only    | 70B 파라미터, 1.4T 토큰 학습 / Compute-optimal scaling 법칙 제시     | DeepMind (*Training Compute-Optimal Large Language Models*)                                  |
| **2022** | **PaLM**       | Decoder-only    | 540B 파라미터 / Pathways 분산 학습 / CoT reasoning 강화            | Google (*PaLM: Scaling Language Models with Pathways*)                                       |
| **2023** | **LLaMA**      | Decoder-only    | 7B\~65B 파라미터 / 공개 모델 / 연구자 접근성 확대                        | Meta (*LLaMA: Open and Efficient Foundation Language Models*)                                |
| **2023** | **GPT-4**      | Decoder-only    | 멀티모달(텍스트+이미지 입력) / 안전성·사실성 강화 / RLHF 적용                  | OpenAI (*GPT-4 Technical Report*)                                                            |
| **2023** | **Claude**     | Decoder-only    | Constitutional AI(헌법 기반 학습) / 안전성 강화 / 초장문 컨텍스트(100k 토큰) | Anthropic (*Constitutional AI: Harmlessness from AI Feedback*)                               |
