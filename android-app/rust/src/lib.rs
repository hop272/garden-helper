use std::ffi::{CStr, CString};
use std::os::raw::c_char;

#[no_mangle]
pub extern "C" fn garden_advice(input: *const c_char) -> *mut c_char {
    let c_str = unsafe { CStr::from_ptr(input) };
    let question = c_str.to_string_lossy().to_lowercase();
    let answer = if question.contains("water") {
        "Water plants when the soil is slightly dry. Avoid overwatering by checking the top 2-3 cm of soil."
    } else if question.contains("sun") || question.contains("light") {
        "Most garden plants prefer morning sun and light afternoon shade. Avoid harsh midday sun on young plants."
    } else if question.contains("soil") {
        "Use rich, well-draining soil with compost mixed in. Maintain a healthy soil structure for strong plant roots."
    } else {
        "This local advice engine offers basic garden care guidance. Ask about water, soil, sun, or plant care."
    };

    CString::new(answer).unwrap().into_raw()
}

#[no_mangle]
pub extern "C" fn free_advice_string(s: *mut c_char) {
    if s.is_null() {
        return;
    }
    unsafe {
        CString::from_raw(s);
    }
}
