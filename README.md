# project_1

-   Jag tog bort den inbyggda zebra Bootstap-tabellstilen och lade till hover-animationen
-   Enligt WAI-ARIA lade jag till role, aria-label och alt attributet för bilderna ignoreras inte
-   Jag använde section, article taggar istället för div där det behövs
-   Tabellrenderingsfunktionen är komplicerad för enkel skalning, det vill säga för att enkelt lägga till nya data om det behövs
-   footer taggen används inte eftersom det inte är i wireframe

# Changelog

## [Unreleased]

-   Användning av objektorienterad stil
-   Användning av databaser istället för JSON
-   Användning av Query selector istället för getElementById
-   v. 1.0.1 hade en enda loop över alla JSON poster. Och v. 1.0.2 har diagramskapningsfunktionen sin egen loop, vilket minskar hastigheten. Jag kommer förmodligen att skapa preCourses funktioner för att skapa data för alla typer av display: tabeller och diagram.
-   När projektet växer, lägg till kommentarer till koden

## [1.0.2] 2021-04-01:

### Changed

-   createCoursesOut refactored till getCoursesTableObj och getCoursesChart enligt clean code principles
-   Funktionen för att hämta data från JSON har flyttats och redesignats som asyncio för läsbarhet av koden
-   course-table/course-chart renamed to courseS-table/courseS-chart
-   Readme.md refactored som Changelog

### Added

-   getCoursesTableObj har default arg nonSummable. Detta görs för möjligheten att skala: till exempel när du lägger till booleska värden i tabellen kommer de inte att summeras
-   All data lagras i listorna över sum ordlista för att inte bara kunna summera utan också hitta medelvärde, median, läge och annat

## [1.0.1] 2021-03-30:

### Fixed:

-   min width av todo-container reduceras för korrekt arbete på mobil
