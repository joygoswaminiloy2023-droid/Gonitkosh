#include "gonitkosh.hpp"
#include <iostream>

using namespace gonitkosh;

int main() {
    std::cout << std::boolalpha;
    std::cout << "=== GonitKosh - Treasury of Mathematics ===\n\n";

    std::cout << " 1. jog(10, 5)            = " << jog(10, 5) << "\n";
    std::cout << " 2. biyog(10, 5)          = " << biyog(10, 5) << "\n";
    std::cout << " 3. gun(10, 5)            = " << gun(10, 5) << "\n";
    std::cout << " 4. bhag(10, 4)           = " << bhag(10, 4) << "\n";
    std::cout << " 5. bhagshesh(10, 3)      = " << bhagshesh(10, 3) << "\n";
    std::cout << " 6. ghat(2, 10)           = " << ghat(2, 10) << "\n";
    std::cout << " 7. borgomul(81)          = " << borgomul(81) << "\n";
    std::cout << " 8. ghonokfol(3)          = " << ghonokfol(3) << "\n";
    std::cout << " 9. borgo(7)              = " << borgo(7) << "\n";
    std::cout << "10. gorh({2, 4, 6, 8})    = " << gorh({2, 4, 6, 8}) << "\n";
    std::cout << "11. sarbadhik({3, 9, 4})  = " << sarbadhik({3, 9, 4}) << "\n";
    std::cout << "12. sarbonimno({3, 9, 4}) = " << sarbonimno({3, 9, 4}) << "\n";
    std::cout << "13. guniyo(5)             = " << guniyo(5) << "\n";
    std::cout << "14. jorno(8)              = " << jorno(8) << "\n";
    std::cout << "15. bijorno(8)            = " << bijorno(8) << "\n";
    std::cout << "16. moulik(97)            = " << moulik(97) << "\n";
    std::cout << "17. gosagu(48, 36)        = " << gosagu(48, 36) << "\n";
    std::cout << "18. losagu(4, 6)          = " << losagu(4, 6) << "\n";
    std::cout << "19. niropekkho(-5.5)      = " << niropekkho(-5.5) << "\n";
    std::cout << "20. nikotomo(2.6)         = " << nikotomo(2.6) << "\n";
    std::cout << "21. nichetol(2.9)         = " << nichetol(2.9) << "\n";
    std::cout << "22. upertol(2.1)          = " << upertol(2.1) << "\n";
    std::cout << "23. shotangsho(500, 12)   = " << shotangsho(500, 12) << "\n";
    std::cout << "24. ultasonkha(12345)     = " << ultasonkha(12345) << "\n";
    std::cout << "25. onkojog(12345)        = " << onkojog(12345) << "\n";
    std::cout << "26. ghurpaksonkha(12321)  = " << ghurpaksonkha(12321) << "\n";

    std::cout << "\n--- Error handling ---\n";
    try { bhag(1, 0); }
    catch (const std::exception& e) { std::cout << "bhag(1, 0)      -> " << e.what() << "\n"; }
    try { borgomul(-4); }
    catch (const std::exception& e) { std::cout << "borgomul(-4)   -> " << e.what() << "\n"; }
    try { guniyo(25); }
    catch (const std::exception& e) { std::cout << "guniyo(25)     -> " << e.what() << "\n"; }

    return 0;
}
