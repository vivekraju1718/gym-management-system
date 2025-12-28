package com.GymManagement.System.constants;

public class ApplicationConstants {

    private ApplicationConstants() {
        throw new AssertionError("Utility class cannot be instantiated");
    }

    public static final String JWT_SECRET_KEY = "JWT_SECRET";
    public static final String JWT_SECRET_DEFAULT_VALUE = "jxgEQeXHuPq8VdbyYFNkANdudQ53YUn4";
    public static final String JWT_HEADER = "Authorization";
    public static final String  BOOKING_STATUS_CONFIRMED = "CONFIRMED";
    public static final String  BOOKING_STATUS_CREATED = "CREATED";
    public static final String  BOOKING_STATUS_CANCELLED = "CANCELLED";
    public static final String CONTACT_STATUS_SENT = "SENT";
    public static final String CONTACT_STATUS_ACCEPTED = "ACCEPTED";
    public static final String CONTACT_STATUS_REJECTED = "REJECTED";
}
