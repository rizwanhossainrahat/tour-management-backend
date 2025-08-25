"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_router_1 = require("../modules/user/user.router");
const auth_route_1 = require("../modules/auth/auth.route");
const divison_route_1 = require("../modules/division/divison.route");
const tour_routes_1 = require("../modules/tour/tour.routes");
const booking_route_1 = require("../modules/booking/booking.route");
const payment_route_1 = require("../modules/payment/payment.route");
const opt_route_1 = require("../modules/otp/opt.route");
const stats_route_1 = require("../modules/stats/stats.route");
exports.router = (0, express_1.Router)();
const moduleRouter = [
    {
        path: "/user",
        route: user_router_1.UserRouters
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/division",
        route: divison_route_1.DivisionRoutes,
    },
    {
        path: "/tour",
        route: tour_routes_1.TourRoutes,
    },
    {
        path: "/booking",
        route: booking_route_1.BookingRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes
    },
    {
        path: "/otp",
        route: opt_route_1.OtpRoutes
    },
    {
        path: "/stats",
        route: stats_route_1.StatsRoutes
    }
];
moduleRouter.forEach((route) => {
    exports.router.use(route.path, route.route);
});
// router.use("/user", UserRoutes)
// router.use("/tour", TourRoutes)
// router.use("/division", DivisionRoutes)
// router.use("/booking", BookingRoutes)
// router.use("/user", UserRoutes)
