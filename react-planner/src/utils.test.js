import { secondsToHourMinuteSecond } from "./utils";

test("0 is 00:00:00", () => {
    expect(secondsToHourMinuteSecond(3600)).toBe("01:00:00");
});
