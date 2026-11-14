#ifndef GONITKOSH_HPP
#define GONITKOSH_HPP

#include <algorithm>
#include <cmath>
#include <cstddef>
#include <cstdlib>
#include <initializer_list>
#include <limits>
#include <stdexcept>
#include <string>
#include <vector>

namespace gonitkosh {

namespace detail {

inline void check(double v, const char* label) {
    if (std::isnan(v))
        throw std::invalid_argument(std::string(label) + " must be a valid number (got NaN)");
}

inline void check_finite(double v, const char* label) {
    check(v, label);
    if (std::isinf(v))
        throw std::domain_error(std::string(label) + " must be finite");
}

inline unsigned long long abs_u(long long n) {
    return n < 0 ? 0ULL - static_cast<unsigned long long>(n)
                 : static_cast<unsigned long long>(n);
}

inline void check_list(const double* p, std::size_t n, const char* fn) {
    if (n == 0)
        throw std::domain_error(std::string(fn) + "() requires at least one number");
    for (std::size_t i = 0; i < n; ++i) check(p[i], "list element");
}

}

inline double jog(double a, double b) {
    detail::check(a, "a"); detail::check(b, "b");
    return a + b;
}

inline double biyog(double a, double b) {
    detail::check(a, "a"); detail::check(b, "b");
    return a - b;
}

inline double gun(double a, double b) {
    detail::check(a, "a"); detail::check(b, "b");
    return a * b;
}

inline double bhag(double a, double b) {
    detail::check(a, "a"); detail::check(b, "b");
    if (b == 0.0) throw std::domain_error("Division by zero is not allowed");
    return a / b;
}

inline double bhagshesh(double a, double b) {
    detail::check(a, "a"); detail::check(b, "b");
    if (b == 0.0) throw std::domain_error("Modulus by zero is not allowed");
    return std::fmod(a, b);
}

inline double ghat(double base, double exponent) {
    detail::check(base, "base"); detail::check(exponent, "exponent");
    if (base == 0.0 && exponent < 0.0)
        throw std::domain_error("Zero cannot be raised to a negative power");
    double r = std::pow(base, exponent);
    if (std::isnan(r))
        throw std::domain_error("Result is not a real number (negative base, fractional exponent)");
    return r;
}

inline double borgomul(double n) {
    detail::check(n, "n");
    if (n < 0.0) throw std::domain_error("Square root of a negative number is not real");
    return std::sqrt(n);
}

inline double ghonokfol(double n) { detail::check(n, "n"); return n * n * n; }

inline double borgo(double n) { detail::check(n, "n"); return n * n; }

inline double gorh(const std::vector<double>& v) {
    detail::check_list(v.data(), v.size(), "gorh");
    double sum = 0.0;
    for (double x : v) sum += x;
    return sum / static_cast<double>(v.size());
}
inline double gorh(std::initializer_list<double> l) { return gorh(std::vector<double>(l)); }

inline double sarbadhik(const std::vector<double>& v) {
    detail::check_list(v.data(), v.size(), "sarbadhik");
    return *std::max_element(v.begin(), v.end());
}
inline double sarbadhik(std::initializer_list<double> l) { return sarbadhik(std::vector<double>(l)); }

inline double sarbonimno(const std::vector<double>& v) {
    detail::check_list(v.data(), v.size(), "sarbonimno");
    return *std::min_element(v.begin(), v.end());
}
inline double sarbonimno(std::initializer_list<double> l) { return sarbonimno(std::vector<double>(l)); }

inline unsigned long long guniyo(int n) {
    if (n < 0) throw std::domain_error("Factorial requires a non-negative integer");
    if (n > 20) throw std::overflow_error("Factorial above 20 overflows unsigned long long");
    unsigned long long r = 1;
    for (int i = 2; i <= n; ++i) r *= static_cast<unsigned long long>(i);
    return r;
}

inline bool jorno(long long n) { return n % 2 == 0; }

inline bool bijorno(long long n) { return n % 2 != 0; }

inline bool moulik(long long n) {
    if (n < 2) return false;
    if (n < 4) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (long long i = 5; i <= n / i; i += 6)
        if (n % i == 0 || n % (i + 2) == 0) return false;
    return true;
}

inline long long gosagu(long long a, long long b) {
    unsigned long long x = detail::abs_u(a), y = detail::abs_u(b);
    while (y != 0) { unsigned long long t = x % y; x = y; y = t; }
    if (x > static_cast<unsigned long long>(std::numeric_limits<long long>::max()))
        throw std::overflow_error("GCD does not fit in long long");
    return static_cast<long long>(x);
}

inline long long losagu(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    unsigned long long g = static_cast<unsigned long long>(gosagu(a, b));
    unsigned long long q = detail::abs_u(a) / g, m = detail::abs_u(b);
    if (q > static_cast<unsigned long long>(std::numeric_limits<long long>::max()) / m)
        throw std::overflow_error("LCM overflows long long");
    return static_cast<long long>(q * m);
}

inline double niropekkho(double n) { detail::check(n, "n"); return std::fabs(n); }

namespace detail {
inline long long to_ll(double v) {
    if (std::isinf(v) || v >= 9.2233720368547758e18 || v < -9.2233720368547758e18)
        throw std::overflow_error("Result does not fit in long long");
    return static_cast<long long>(v);
}
}

inline long long nikotomo(double n) { detail::check(n, "n"); return detail::to_ll(std::round(n)); }

inline long long nichetol(double n) { detail::check(n, "n"); return detail::to_ll(std::floor(n)); }

inline long long upertol(double n) { detail::check(n, "n"); return detail::to_ll(std::ceil(n)); }

inline double shotangsho(double number, double percent) {
    detail::check(number, "number"); detail::check(percent, "percent");
    return number * percent / 100.0;
}

inline long long ultasonkha(long long n) {
    unsigned long long x = detail::abs_u(n), r = 0;
    const unsigned long long lim = static_cast<unsigned long long>(std::numeric_limits<long long>::max());
    while (x > 0) {
        unsigned long long d = x % 10;
        if (r > (lim - d) / 10) throw std::overflow_error("Reversed number overflows long long");
        r = r * 10 + d;
        x /= 10;
    }
    return n < 0 ? -static_cast<long long>(r) : static_cast<long long>(r);
}

inline long long onkojog(long long n) {
    unsigned long long x = detail::abs_u(n);
    long long s = 0;
    while (x > 0) { s += static_cast<long long>(x % 10); x /= 10; }
    return s;
}

inline bool ghurpaksonkha(long long n) {
    if (n < 0) return false;
    unsigned long long x = static_cast<unsigned long long>(n), r = 0;
    while (x > 0) { r = r * 10 + x % 10; x /= 10; }
    return r == static_cast<unsigned long long>(n);
}

}

#endif
