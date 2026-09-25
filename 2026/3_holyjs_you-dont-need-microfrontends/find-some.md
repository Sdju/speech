Я собрал **69 разных докладов/выступлений без очевидных дублей**: 54 в лагере «микрофронтенды полезны / вот как их правильно применять» и 15 в лагере «осторожно / часто не нужны / альтернатива лучше».

Под «позитивными» я считаю не только восторженные доклады, но и production-case / how-to, где автор в итоге считает MFE оправданным. Под «негативными» — anti-hype, разбор издержек, доклады в пользу монолита/modulith или тезис «большинству они не нужны».

## 🟢 Лагерь 1 — за микрофронтенды

### На русском — 19 докладов

| Доклад | Спикер / событие | Характер позиции |
|---|---|---|
| **Революция в микрофронтендах, Module Federation, Webpack 5** | Павел Черторогов, HolyJS 2020 | Сильный pro-MFE, Module Federation как важный шаг | [HolyJS / запись](https://holyjs.ru/archive/2020%20Moscow/talks/?utm_source=chatgpt.com) |
| **Microfrontends на React вместе с Kubernetes** | Иван Затравкин, HolyJS 2020 | Практическое внедрение + проблемы, но вывод конструктивный | [доклад](https://holyjs.ru/en/archive/2020%20Moscow/talks/4cevcnexmdlcgipriym59j/?utm_source=chatgpt.com) |
| **Микрофронтенды на tinkoff.ru** | Дмитрий Кузнецов, Frontend Live 2020 | Большой production-case: независимые релизные циклы | [YouTube](https://www.youtube.com/watch?v=adgUumoPv6o&utm_source=chatgpt.com) |
| **Микрофронтенды. Два года в продакшне** | Владимир Санников, Точка, FrontendConf 2021 | Особенно ценный long-term production-case | [YouTube](https://www.youtube.com/watch?v=T3_lVp3WOFo&utm_source=chatgpt.com) |
| **Микросервис головного мозга. Пилим всё, что движется** | Михаил Трифонов, Cloud.ru, FrontendConf 2021 | Очень pro-MFE: скорость команд и релизов | [материалы доклада](https://frontendconf.ru/moscow/2021/abstracts/8098?utm_source=chatgpt.com) |
| **Микрофронтенды и виджеты в 2021-м** | Алексей Гусев, Яндекс | Умеренно pro: применять осмысленно, но подход полезен | [YouTube](https://www.youtube.com/watch?v=RcWqY4kcjDY&utm_source=chatgpt.com) |
| **Micro frontends on modules and web components** | Юрий Караджов, Bolt, HolyJS 2021 | Реализация через modules/Web Components | [HolyJS](https://holyjs.ru/en/archive/2021%20Piter/talks/2jck5mvh4btaiohe4krk0f/?utm_source=chatgpt.com) |
| **Как микрофронтенды решают проблемы** | Зар Захаров, FrontendConf 2022 | Вводный аргумент «зачем это вообще нужно» | [YouTube](https://www.youtube.com/watch?v=lRI5eCOnPpI&utm_source=chatgpt.com) |
| **История о том, как мы на Module Federation съезжали** | Максим Смирнов, Тинькофф, FrontendConf 2022 | Реальная миграция монолита → независимые MFE | [YouTube](https://www.youtube.com/watch?v=ZOzsnjzyKsA&utm_source=chatgpt.com) |
| **Shared Modules** | Андрей Гладков, hh.ru, HolyJS 2022 | Как решать duplication/shared dependencies | [HolyJS](https://holyjs.ru/en/archive/2022%20Autumn/talks/20001394-shared-modules/?utm_source=chatgpt.com) |
| **«Коробочный» discovery для микрофронтендов — часть 1** | Иван Малюгин, билайн, HolyJS 2023 | Как снизить инфраструктурную сложность MFE | [HolyJS](https://holyjs.ru/archive/2023%20Spring/talks/0438a61b094e4dafb47f4f30ea26a3ec/?utm_source=chatgpt.com) |
| **«Коробочный» discovery для микрофронтендов — часть 2** | Иван Малюгин, билайн, HolyJS 2023 | Продолжение production/tooling-подхода | [HolyJS](https://holyjs.ru/archive/2023%20Spring/talks/20001985-an-out-of-the-box-discovery-for-microfrontends-based-on-modulefederation-part-2/?utm_source=chatgpt.com) |
| **Микрофронтенды: build time vs runtime** | Александр Гончаров, FrontendConf 2023 | Называет MFE «логичным архитектурным развитием индустрии» | [видео](https://rutube.ru/video/13be3e1d9183c1a376af39ed8692f9db/?utm_source=chatgpt.com) |
| **Автоматизируем контроль качества микрофронтов** | Михаил Трифонов, Cloud.ru, FrontendConf 2023 | 100+ сервисов / 21 команда: как жить с MFE в масштабе | [YouTube](https://www.youtube.com/watch?v=Gb6dMYDPQkY&utm_source=chatgpt.com) |
| **DX и Observability микрофронтендов** | Евгений Мальченко, QIWI, FrontendConf 2023 | Как сделать MFE удобными для множества команд | [FrontendConf](https://frontendconf.ru/moscow/2023/sections/arhitektura_i_patterny?utm_source=chatgpt.com) |
| **Микрофронтенды: разбиваемся на кросс-функциональные команды и деплоим без боли** | Александр Гончаров, TechLeadConf 2024 | Сильный организационный аргумент за MFE | [TechLeadConf](https://techleadconf.ru/moscow/2024/abstracts/13834?utm_source=chatgpt.com) |
| **Микрофронтенды: стабильная интеграция нескольких SPA** | Александр Посонский, FrontendConf 2025 | Как сделать независимый deploy и стабильную интеграцию | [FrontendConf](https://frontendconf.ru/moscow/2025/abstracts/15671?utm_source=chatgpt.com) |
| **Микрофронтенды: EventBus на максималках — строим расширяемую систему коммуникаций** | Александр Пипинов, Яндекс, FrontendConf 2025 | Решает одну из главных болей MFE — коммуникацию | [FrontendConf 2025](https://frontendconf.ru/moscow/2025/abstracts?utm_source=chatgpt.com) |
| **Микрофронтенды: упрощаем разработку через dev-окружение** | Иван Усынин, Альфа-Банк, FrontendConf 2025 | DX/tooling вокруг большой MFE-экосистемы | [FrontendConf](https://frontendconf.ru/moscow/2025/abstracts/16074?utm_source=chatgpt.com) |

### На английском — 35 докладов

| Доклад | Спикер / событие | Почему в pro-лагере |
|---|---|---|
| **Lessons from DAZN: Scaling Your Project with Micro-Frontends** | Luca Mezzalira | Классический большой production-case DAZN | [InfoQ](https://www.infoq.com/presentations/dazn-microfrontend/?utm_source=chatgpt.com) |
| **The Ideal Micro-Frontends Platform** | Luca Mezzalira, QCon London 2025 | Как правильно построить MFE-платформу | [QCon](https://qconlondon.com/presentation/apr2025/ideal-micro-frontends-platform?utm_source=chatgpt.com) |
| **Lessons Learned in Migrating to Micro-Frontends** | Luca Mezzalira, QCon SF 2025 | Практический roadmap миграции | [QCon](https://qconsf.com/presentation/nov2025/lessons-learned-migrating-micro-frontends?utm_source=chatgpt.com) |
| **Micro Frontends – a Strive for Fully Verticalized Systems** | David Leitner, Devoxx Poland 2019 | MFE как средство уйти от frontend-monolith | [YouTube](https://www.youtube.com/watch?v=BdogUPEC27w&utm_source=chatgpt.com) |
| **Micro Frontends – Extending Service-Oriented Architecture to Frontend Development** | Jakub Sowiński, Devoxx Poland 2019 | Production experience StepStone | [доклад](https://www.classcentral.com/course/youtube-micro-frontends-extending-service-oriented-architecture-to-frontend-development-jakub-sowinski-195831?utm_source=chatgpt.com) |
| **Micro Frontends – Composing a Greater Whole** | Yoav Yanovski, Vue.js Amsterdam 2020 | Прямо содержит секцию «Micro Frontends is Awesome» | [доклад](https://www.classcentral.com/course/youtube-yoav-yanovski-micro-frontends-composing-a-greater-whole-vue-js-amsterdam-2020-247479?utm_source=chatgpt.com) |
| **The Micro-Frontend Revolution at Amex** | Ruben Casas, Node Congress 2021 | American Express, тысячи разработчиков | [запись](https://www.classcentral.com/course/youtube-the-micro-frontend-revolution-at-amex-ruben-casas-247723?utm_source=chatgpt.com) |
| **Micro-Frontends Performance and Centralised Data Caching** | Ruben Casas, React Advanced 2021 | Опровергает тезис «MFE обязательно медленные» | [GitNation](https://gitnation.com/contents/micro-frontends-performance-and-centralised-data-caching?utm_source=chatgpt.com) |
| **Monolith to Micro-Frontends** | Ruben Casas, React Advanced 2022 | Паттерны миграции от монолита | [GitNation](https://gitnation.com/contents/monolith-to-micro-frontends?utm_source=chatgpt.com) |
| **Micro-frontends with React Router 6** | Ruben Casas, Wey Wey Web 2022 | Практический способ композиции MFE | [YouTube](https://www.youtube.com/watch?v=tI8RYB5rcVw&utm_source=chatgpt.com) |
| **Micro Frontends: The Evolution of Frontend Architecture** | Ruben Casas, QCon London 2023 | MFE как крайняя точка спектра decoupling | [InfoQ](https://www.infoq.com/presentations/evolution-micro-frontend/?utm_source=chatgpt.com) |
| **Micro-frontends: Is it a Silver Bullet?** | Liron Cohen, ReactNext 2019 | С оговорками, но на основе успешной миграции AppsFlyer | [YouTube](https://www.youtube.com/watch?v=asqgKaUMXq0&utm_source=chatgpt.com) |
| **Micro-Frontends with Module Federation: Beyond the Basics** | Manfred Steyer, EnterpriseNG 2021 | Advanced implementation / best practices | [YouTube](https://www.youtube.com/watch?v=8peHqzO7oqE&utm_source=chatgpt.com) |
| **Angular Based Micro Frontends with Module Federation** | Manfred Steyer, ng-conf 2022 | Практический шаблон для Angular | [YouTube](https://www.youtube.com/watch?v=CDKK6FVvqvs&utm_source=chatgpt.com) |
| **How Can Webpack Module Federation Be a Micro Frontends Game Changer** | Natalia Venditto, JSWorld 2021 | Module Federation как game changer для MFE | [доклад](https://www.classcentral.com/course/youtube-natalia-venditto-how-can-webpack-module-federation-be-a-micro-frontends-game-changer-jsworld-2021-247418?utm_source=chatgpt.com) |
| **Applications Instead of Libraries – Micro Frontends Implemented Through Module Federation** | Devoxx / Voxxed Days | Плюсы независимых team-owned frontend apps | [доклад](https://www.classcentral.com/course/youtube-vdz22-applications-instead-of-libraries-micro-frontends-implemented-through-module-federation-195504?utm_source=chatgpt.com) |
| **Our Journey Into μFrontends** | Rita Castro, Volkswagen, React Summit 2023 | MFE улучшили autonomy/DX и помогли с tech debt | [видео](https://gitnation.com/contents/our-journey-into-mfrontends/video?utm_source=chatgpt.com) |
| **Challenges of Decomposing a Massive Front-End Using Micro-Frontends** | Oleksandr Tryshchenko, Personio, React Day Berlin 2023 | «Что получили / чем пожертвовали», итог скорее pro | [GitNation](https://gitnation.com/contents/challenges-of-decomposing-a-massive-front-end-using-micro-frontends?utm_source=chatgpt.com) |
| **Micro-Frontends: Revolutionizing Frontend Development** | Nataly Rocha, JSNation US 2024 | Явно pro-MFE: scalability/autonomy/deployment | [GitNation](https://gitnation.com/contents/whats-with-micro-frontends?utm_source=chatgpt.com) |
| **Bye Bye Frontend Monolith: Accelerating Feature Development with Micro Frontends** | Michael Geers, Philly ETE 2021 | Один из наиболее прямых аргументов за MFE | [YouTube](https://www.youtube.com/watch?v=sRKo1Rt5ypU&utm_source=chatgpt.com) |
| **How Deep Is Your Micro Frontend?** | Michael Geers, MFE Conference 2023 | Domain ownership / vertical architecture | [slides / transcript](https://speakerdeck.com/naltatis/how-deep-is-your-micro-frontend?utm_source=chatgpt.com) |
| **The Tractor Store 2.0: The TodoMVC for Micro Frontends** | Michael Geers, MFE Conference 2024 | Практическая reference implementation | [доклад](https://conference.microfrontends.cloud/2024/schedule/tractor-store-v2?utm_source=chatgpt.com) |
| **Micro Frontends – True End-to-End Decoupling in Practice** | Michael Geers, Hey Architect! 2024 | Strong pro: domain ownership и vertical teams | [slides](https://speakerdeck.com/naltatis/micro-frontends-true-end-to-end-decoupling-in-practice?utm_source=chatgpt.com) |
| **The Past, Present, and Future of Micro Frontends** | Florian Rappl, MFE Conference 2023 | «established pattern», взгляд на дальнейшее развитие | [YouTube](https://www.youtube.com/watch?v=tNokay7A3sw&utm_source=chatgpt.com) |
| **Microfrontends with Blazor: Welcome to the Party!** | Florian Rappl, .NET Conf 2020 | Перенос MFE-паттерна в Blazor | [Microsoft Learn](https://learn.microsoft.com/en-us/shows/dotnetconf-2020/microfrontends-with-blazor-welcome-to-the-party?utm_source=chatgpt.com) |
| **Micro Frontend Discovery – The Driver for Scalability** | Florian Rappl, Craft 2023 | Discovery/service registry как основа масштабирования MFE | [материалы](https://dev.to/florianrappl/micro-frontend-discovery-the-driver-for-scalability-oai?utm_source=chatgpt.com) |
| **8 Things You Didn't Know Micro Frontends Can Do** | Florian Rappl, React Summit US 2024 | Очень pro-MFE: дополнительные возможности архитектуры | [GitNation](https://gitnation.com/events/react-summit-us-2024?utm_source=chatgpt.com) |
| **Module Federation & SSR** | Zack Jackson, MFE Conference 2023 | Scalable distributed frontend + SSR | [YouTube](https://www.youtube.com/watch?v=x63PIpqQME8&utm_source=chatgpt.com) |
| **Redefining Module Federation in 2024: Beyond Webpack** | Zack Jackson, CityJS 2024 | Будущее Module Federation / distributed frontend | [YouTube](https://www.youtube.com/watch?v=O7xZZoCTxjw&utm_source=chatgpt.com) |
| **From Monolith to Micro Frontend** | Juan Carlos, MFE Conference 2024 | Реальный migration journey | [YouTube](https://www.youtube.com/watch?v=Bc4uzOVmyyU&utm_source=chatgpt.com) |
| **Migrating from Monolithic to Future-Proof Micro Frontends** | David Serrano, MFE Conference 2024 | Эволюционная миграция в MFE | [доклад](https://conference.microfrontends.cloud/2024/speakers/david-serrano?utm_source=chatgpt.com) |
| **Micro Frontends for Mobile** | Mo Javad, MFE Conference 2024 | Расширяет подход на mobile | [записи конференции](https://conference.microfrontends.cloud/2024/live?utm_source=chatgpt.com) |
| **Micro-Frontend Magic in a Regulated Environment** | James Strachan, Nikola Kovačević, NDC | MFE как решение проблем productivity/integration в regulated systems | [доклад](https://www.classcentral.com/course/youtube-micro-frontend-magic-in-a-regulated-environment-james-strachan-nikola-kovacevic-213908?utm_source=chatgpt.com) |
| **Breaking Up the Front End Monolith: An Introduction to Micro Frontends** | Even Zhang, Latency 2023 | Прямая аргументация против frontend-monolith | [Mechanical Rock](https://www.mechanicalrock.io/learn/videos?utm_source=chatgpt.com) |
| **Building Microfrontends on AWS** | Derick Chen, CityJS Singapore 2023 | Scalability, maintainability, independent delivery | [материалы доклада](https://www.buildwithdc.co/posts/2023-cityjs-micro-frontend/?utm_source=chatgpt.com) |

Ещё три хороших **исторических** доклада Michael Geers, которые стоит добавить к pro-корпусу: *Micro Frontends: Break Up Your Web App!* (2017), *Micro Frontends – Think Smaller, Avoid the Monolith, ❤️ the Backend* (Web Rebels 2018) и *The Nitty Gritty Details or Frontend, Backend, 🌈 Happyend* (MicroCPH 2019). Все три собраны в архиве автора. :chatgpt-content-reference{index="54"}

---

# 🔴 Лагерь 2 — против / скептически / «вам, скорее всего, это не нужно»

Здесь самые интересные материалы для архитектурной дискуссии. Важно: часть авторов **не отрицает MFE полностью**, а утверждает, что хайп вокруг них значительно шире реальной области применимости.

### На русском — 6

| Доклад | Спикер / событие | Основной контраргумент |
|---|---|---|
| **Glorious Monolith: масштабируем приложение без микрофронтендов** | Максим Земсков, Яндекс, HolyJS 2023 Autumn | Самый чистый RU-контраргумент: многие преимущества MFE можно получить хорошим монолитом | [HolyJS](https://holyjs.ru/archive/2023%20Autumn/talks/20003049-glorious-monolith-scaling-an-application-without-microfrontends/?ysclid=lwavjvwbq1900050905&utm_source=chatgpt.com) |
| **Микрофронтенды — маленькие команды, большие проблемы** | Динара Николаева, Positive Technologies, FrontendConf 2024 | Независимые команды создают новый коммуникационный долг и риск «Франкенштейна» | [YouTube](https://www.youtube.com/watch?v=MGjo-pY7CNc&utm_source=chatgpt.com) |
| **Микрофронты: нужны или нет?** | Семён Левенсон, Никита Сидоров, Яндекс | Сильная подборка аргументов против: слабая изоляция, interop, один MFE может сломать другой | [YaTalks](https://yatalks.yandex.ru/ru/hub/mikrofronty-nuzhny-ili-net?utm_source=chatgpt.com) |
| **Дебаты «Микрофронтенд vs Монолит»** | FrontendConf 2023 | Прямое столкновение двух архитектурных лагерей | [FrontendConf](https://frontendconf.ru/moscow/2023/abstracts/11303?utm_source=chatgpt.com) |
| **Чем болеют большие фронтенды: монорепы и микрофронтенды** | Иван Соловьёв, Evrone, FrontendConf 2020 | Релизные циклы, dependencies, duplication и стоимость разделения | [FrontendConf](https://frontendconf.ru/moscow/2020/abstracts/6967?utm_source=chatgpt.com) |

### На английском — 9

| Доклад | Спикер / событие | Насколько критичный |
|---|---|---|
| **The Risks of Micro-Frontends** | Ruben Casas, CityJS 2022 | 🔴 Один из лучших прямых «что может пойти не так» | [YouTube](https://www.youtube.com/watch?v=R8dTiT9nKow&utm_source=chatgpt.com) |
| **The Problems Micro Frontends Won't Solve That No One Wants to Talk About** | Jennifer Wadella, NDC | 🔴 Отличный анти-silver-bullet доклад | [YouTube](https://www.youtube.com/watch?v=KfezmwfTu7Y&utm_source=chatgpt.com) |
| **Adopting Micro-Frontends Without Micro-Frontends** | Alex Lobera, React Advanced 2022 | 🔴 Как получить преимущества MFE без production-MFE | [GitNation](https://gitnation.com/contents/adopting-micro-frontends-without-micro-frontends?utm_source=chatgpt.com) |
| **Stairway to Heaven – Scaling Frontends the Right Way** | Florian Rappl, WeAreDevelopers 2022 | 🔴 Предлагает **modular monolith / modulith** как альтернативу | [видео](https://www.wearedevelopers.com/videos/492/stairway-to-heaven-scaling-frontends-the-right-way?utm_source=chatgpt.com) |
| **Micro Frontends Unmasked: Opportunities, Challenges, Alternatives** | Manfred Steyer, MFE Conference 2024 | 🟠 Системно сравнивает benefits с complexity и альтернативами | [slides](https://speakerdeck.com/manfredsteyer/micro-frontends-unmasked-opportunities-challenges-alternatives?utm_source=chatgpt.com) |
| **The Hidden Challenges of Runtime Integrated Micro Frontends** | Cathrin Möller, MFE Conference 2024 | 🟠 Критика именно runtime-composition | [конференция / запись](https://conference.microfrontends.cloud/2024/schedule?utm_source=chatgpt.com) |
| **Microfrontends Anti-Patterns: Seven Years in the Trenches** | Luca Mezzalira, QCon | 🟠 Автор pro-MFE, но это отличный каталог того, как MFE ломают | [YouTube](https://www.youtube.com/watch?v=n1XSeiLhBtE&utm_source=chatgpt.com) |
| **Between Monolith and Microfrontends – Advantages of a Modulithic Architecture** | Milena-Mercedes May, BOB 2025 | 🔴 Реальный кейс масштабирования нескольких команд **без MFE** | [BOB Conference](https://bobkonf.de/2025/may.html?utm_source=chatgpt.com) |
| **The Hidden Cost of Shared Frontend Code: Lessons from 8 Apps and One Monorepo** | Mansi Manhas, React Summit US 2026 | 🟠 Не чистый anti-MFE, но очень полезный разбор distributed frontend costs | [GitNation](https://gitnation.com/contents/the-hidden-cost-of-shared-frontend-code-lessons-from-8-apps-and-one-monorepo-3776?utm_source=chatgpt.com) |

## Что смотреть, если цель — устроить содержательные дебаты

Если нужно не просто изучить технологию, а подготовиться к спору **«нужны ли нам микрофронтенды?»**, я бы поставил друг напротив друга следующие пары.

**Ruben Casas — *The Micro-Frontend Revolution at Amex*** ↔ **Ruben Casas — *The Risks of Micro-Frontends***. Особенно хорошая пара, потому что **один и тот же человек** объясняет и преимущества, и реальные проблемы архитектуры. :chatgpt-content-reference{index="71"}

**Michael Geers — *Bye Bye Frontend Monolith*** ↔ **Florian Rappl — *Scaling Frontends the Right Way***. Первый объясняет, почему frontend-monolith тормозит крупные организации; второй показывает, что часть этой проблемы можно решить modulith/monorepo без distributed runtime. :chatgpt-content-reference{index="72"}

Из русскоязычных лучший контраст — **Владимир Санников «Микрофронтенды. Два года в продакшне»** ↔ **Максим Земсков «Glorious Monolith»**. А затем добавить **«Микрофронты: нужны или нет?»** от Яндекса как более спокойную дискуссию между двумя позициями. :chatgpt-content-reference{index="73"}

Если твоя конечная задача — **принять архитектурное решение для проекта**, я бы не считал голоса «за/против», а выписал из этих докладов четыре оси: **количество автономных команд, независимость деплоев, ясность domain boundaries и цена runtime/distributed complexity**. Практически все серьёзные спикеры сходятся именно на том, что MFE — решение прежде всего **организационного масштабирования**, а не способ сделать обычный frontend «архитектурнее». 