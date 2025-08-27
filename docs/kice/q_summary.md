# AI 직무 평가 대비 강의 자료 (기술 블로그 스타일)  
## 1. 데이터 전처리  
### 데이터 수집과 편향 (Bias)  
- **시험 포인트:** 데이터 수집 시 편향 최소화가 중요합니다. 한 명의 전문가만 레이블링하면 일관성은 생기지만 개인적 편향이 전체 데이터셋에 반영됩니다.  
- **실무 사례:** ImageNet도 초기에는 서구권 데이터 위주라서 인종·문화적 편향 문제가 논의되었습니다. Google의 “Inclusive Images Challenge(2018)”는 다양한 지역 데이터를 추가해 이를 완화하고자 했습니다.  
- **연구 참고:**  
- Torralba & Efros, *Unbiased Look at Dataset Bias* (CVPR 2011).  
- Mitchell et al., *Model Cards for Model Reporting* (FAT* 2019).  
### 데이터 정제 (Normalization vs. Standardization)  
- **시험 포인트:**  
- Min-Max Normalization: \[0,1\] 구간으로 스케일링 → 이상치(outlier)에 민감.  
- Standardization: 평균 0, 표준편차 1로 변환 → 회귀, PCA에 적합.  
- **연구/사례:**  
- LeCun et al. (1998) MNIST → 입력 데이터 정규화를 통해 빠른 학습 달성.  
- Ioffe & Szegedy, *Batch Normalization* (ICML 2015).  
### 데이터 증강 (Data Augmentation)  
- **시험 포인트:** 자율주행 Semantic Segmentation에는 Random Erasing이 적합. 이는 가려짐 상황을 학습시켜 모델을 더 강인하게 만듭니다.  
- **연구/사례:**  
- Zhong et al., *Random Erasing Data Augmentation* (AAAI 2020).  
- CutMix, Mixup, AugMix 등은 분류 과제에 강점.  
---  
## 2. AI 모델 개발  
### 아키텍처 설계 & Self-Supervised Learning  
- **시험 포인트:** SimCLR, BYOL, MAE, RotNet 등 self-supervised 기법의 핵심 이해.  
- **연구/사례:**  
- Chen et al., *SimCLR* (ICML 2020).  
- Grill et al., *BYOL* (NeurIPS 2020).  
- He et al., *MAE* (CVPR 2022).  
### Explainable AI (XAI)  
- **시험 포인트:** CAM vs. Grad-CAM 구분. CAM은 FC layer 가중치 기반, Grad-CAM은 손실 기울기 기반.  
- **연구/사례:**  
- Zhou et al., *CAM* (CVPR 2016).  
- Selvaraju et al., *Grad-CAM* (ICCV 2017).  
### 모델 학습 & 평가 (Learning Curve, 지표)  
- **시험 포인트:**  
- 언더피팅: 모델 복잡도 ↑, 특징 ↑ 필요.  
- 과적합: Dropout, L2 정규화, BatchNorm 등 활용.  
- 지표: Recall = 안전-critical 환경에서 중요.  
- **연구/사례:**  
- Srivastava et al., *Dropout* (JMLR 2014).  
- Powers, *Evaluation: Precision, Recall, F-measure* (2011).  
### 모델 튜닝 (HPO & Class Imbalance)  
- **시험 포인트:**  
- Bayesian Optimization: 효율적 HPO.  
- 클래스 불균형 → SMOTE, 언더샘플링, Focal Loss 등.  
- **연구/사례:**  
- Bergstra & Bengio, *Random Search for Hyper-Parameter Optimization* (JMLR 2012).  
- Lin et al., *Focal Loss* (ICCV 2017).  
---  
## 3. AI 시스템 구축  
### ML Pipeline & 배포 전략  
- **시험 포인트:** Model-in-service vs. Model-as-service 비교.  
- In-service: 기존 인프라 재활용, 서버 리소스 점유↑.  
- As-service: 확장성↑, 독립적 관리 용이.  
- **사례:** Google TFX, Kubeflow / Docker-K8s 기반 CI/CD.  
### MLOps & 자동화  
- **시험 포인트:** MLOps maturity level: 수동(Level 0) ↔ 자동화(Level 1+).  
- **사례/백서:**  
- Google Cloud, *Continuous Training for ML* (2020).  
- AWS Sagemaker, Azure ML docs.  
### 모델 최적화  
- **시험 포인트:** 모델 경량화 기법 → Pruning, Quantization, EfficientNet의 Compound Scaling.  
- **연구/사례:**  
- Han et al., *Deep Compression* (ICLR 2016).  
- Tan & Le, *EfficientNet* (ICML 2019).  
---  
## 4. 주요 AI 트렌드  
### Zero-shot & Generalized Zero-shot Learning  
- **시험 포인트:** 새로운 클래스 인식 능력.  
- **연구/사례:**  
- Xian et al., *Zero-shot Learning – A Comprehensive Evaluation* (TPAMI 2018).  
- Radford et al., *CLIP* (ICML 2021).  
### Chain-of-Thought Prompting  
- **시험 포인트:** 단계적 추론 유도.  
- **연구/사례:**  
- Wei et al., *Chain-of-Thought Prompting* (NeurIPS 2022).  
### NAS & DARTS  
- **시험 포인트:** Neural Architecture Search, 미분 가능 탐색(DARTS).  
- **연구/사례:**  
- Zoph & Le, *Neural Architecture Search* (ICLR 2017).  
- Liu et al., *DARTS* (ICLR 2019).  
---  
🔹 Level 0: 수동 운영 (Manual)

모델 개발, 배포, 재학습을 사람이 직접 처리.

데이터 준비 → 학습 → 평가 → 배포가 모두 단발성 프로젝트 성격.

재현성 부족, 자동화 없음.

스타트업·연구 프로젝트 초기 단계에서 흔히 나타남.

🔹 Level 1: 자동화된 파이프라인 (ML Pipeline Automation)

데이터 전처리, 학습, 평가, 배포 단계를 CI/CD 파이프라인처럼 연결.

코드 변경 → 자동 재학습 및 배포 가능.

Kubeflow, TFX, MLflow 같은 도구 활용.

핵심: 모델 개발부터 배포까지의 반복을 자동화.

🔹 Level 2: 자동 모니터링 및 재학습 (Continuous Training / MLOps)

운영 중 모델을 실시간 모니터링.

성능 지표, 데이터 분포, drift 탐지.

이상 발생 시 자동으로 재학습 파이프라인 실행.

데이터 드리프트·개념 드리프트 대응 가능.

모델 레지스트리와 버전 관리 체계 포함.

🔹 Level 3: 완전 자동화된 ML 시스템 (Full MLOps / AutoMLOps)

데이터 수집 → 학습 → 배포 → 모니터링 → 재학습까지 엔드-투-엔드 자동화.

인적 개입 최소화, 지속적인 모델 개선.

AutoML 기법과 결합되어, 새로운 태스크에 자동으로 적응 가능.

대규모 기업 환경에서 목표로 삼는 최종 단계.

📌 정리:

Level 0 = 수동, ad-hoc

Level 1 = 학습/배포 자동화 (파이프라인화)

Level 2 = 모니터링·재학습 자동화 (지속적 운영)

Level 3 = 완전 자동화, AutoML과 결합

[참고](https://velog.io/@leesjpr/MLOps-%EC%88%98%EC%A4%80)