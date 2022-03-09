# CodersCamp 2021/2022 | Projekt Zespołowy | Node.js

- [Zespół projektowy](#zespół-projektowy)
- [E-Wolontariat](#e-wolontariat)
  - [Demo](#demo)
  - [Cel projektu](#cel-projektu)
  - [Działanie aplikacji](#działanie-aplikacji)
  - [Wykorzystywane technologie](#wykorzystywane-technologie)
  - [Funkcjonalności](#funkcjonalności)
  - [Uruchomienie projektu](#uruchomienie-projektu)
  - [Organizacja pracy](#organizacja-pracy)

## Zespół projektowy

Zespół pracował w ramach kursu [CodersCamp 2021](https://coderscamp.pl/).
Aplikację została wykonana przez uczestników kursu pod okiem dwóch mentorów.

**Mentorzy**: Dariusz Knysak, Paweł Michalak

**Uczestnicy**:

- [Marcin Barszcz](https://github.com/marcinnnnb)
- [Agnieszka Bury](https://github.com/angbur)
- [Agnieszka Kapelańczyk](https://github.com/MysiaPysia16)
- [Marta Pejkowska](https://github.com/MartaPejkowska)

## E-Wolontariat

![This is an image](https://github.com/marcinnnnb/CodersCamp2021-Project-React-Node-eWolontariat/blob/9d64011d85607468474710fbb63e6153c1418b09/src/assets/img/hero.png)

### Demo

Wersja demonstracyjna aplikacji jest dostępna [TUTAJ].

### Cel projektu

Celem projektu było napisanie aplikacji wykorzystującej wiedzę nabytą z trzeciego działu kursu tj. z następujących technologii:
* Node.js
* Express.js
* Atlas MongoDB
* Mongoose

Zespół projektowy zdecydował się na aplikację własnego pomysłu. eWolontariat jest aplikacją umożliwiającą użytkownikowi zapisanie się do grona Wolontariuszy i aktywnie działanie wśród nich. Możliwe jest również stworzenie profilu organizacji, która poszukuje wolontariuszy i udostępnia aktualne zadania.

Aplikacja została wykonana wg wymagań dostarczonych przez organizatorów CodersCamp.
Szablon projektu dostępny jest [TUTAJ](https://github.com/KrystianKjjk/CodersCamp2020.Project.FullStack-Node-React.OrganizationApp/blob/main/README.md).

### Działanie aplikacji

_Obsługiwane zapytania_
* /api/user'
* /api/user/login'
* /api/user/register'
* /api/event'
* /api/volunteer


### Wykorzystywane technologie

W trakcie developmentu wykorzystujemy:

   * bcrypt
   * bodyParser
   * dotenv
   * joi
   * jsonwebtoken
   * multer
   * swagger

### Funkcjonalności:

* Wykonane przez nasz zespół REST API pozwala na obsługę zapytań: __GET__, __POST__, __DELETE__, __PUT__, __PATCH__.
* Umożliwia rejestrację oraz logowanie użytkownika.
* Zapewnia hashowanie hasła i bezpieczne jego przechowywanie w bazie danych.
* Umożliwia wysłanie e-maila do użytkownika z informacją o rejestracji.
* Zabezpiecza dostęp do określonych zapytań poprzez autentykacje oraz autoryzacje(dostep tylko dla użytkowników zalogowanych).
* Dzięki wykorzystaniu kodowania base64 przesyłamy na serwer pliki graficzne, które będą później wykorzystane przez front-end. .
* Wykonane REST API korzysta z podwójnej walidacji wprowadzanych danych: wbudowanej w mongoose podczas pisania schematu oraz z walidacji poprzez obiekt __joi__.


### Uruchomienie projektu

Aby uruchomić aplikację na lokalnej maszynie, wykonaj następujące kroki:

1. Zainstaluj zależności za pomocą komendy: `npm install`
2. Wystartuj serwer developerski `npm start`

Kod produkcyjny aplikacji znajduje się w katalogu `src`.

### Organizacja pracy

Przy użyciu narzędzia GitHubProjects rozdzielono poszczególne moduły. Komunikacja zespołu odbywała się głównie przez Google Meets i Discord.