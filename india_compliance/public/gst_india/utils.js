frappe.provide("ic");

window.gst_settings = frappe.boot.gst_settings;

ic.get_gstin_query = function (party, party_type = "Company") {
    if (!party) {
        frappe.show_alert({
            message: __("Please select {0} to get GSTIN options", [__(party_type)]),
            indicator: "yellow",
        });
        return;
    }

    return {
        query: "india_compliance.gst_india.utils.get_gstin_list",
        params: { party, party_type },
    };
};

ic.get_party_type = function (doctype) {
    return in_list(frappe.boot.sales_doctypes, doctype) ? "Customer" : "Supplier";
};

ic.set_state_options = function (frm) {
    const state_field = frm.get_field("state");
    const country = frm.get_field("country").value;
    if (country !== "India") {
        state_field.set_data([]);
        return;
    }

    state_field.set_data(frappe.boot.india_state_options || []);
};

ic.can_enable_api = function (settings) {
    return settings.api_secret || frappe.boot.ic_api_enabled_from_conf;
};

ic.is_api_enabled = function (settings) {
    if (!settings) settings = gst_settings;
    return settings.enable_api && ic.can_enable_api(settings);
};