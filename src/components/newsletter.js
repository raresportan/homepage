import React from "react"
import { Helmet } from "react-helmet";

import './newsletter.css';

const Newsletter = () => {

    return (
        <>
            <Helmet>
                <script src="https://f.convertkit.com/ckjs/ck.5.js"></script>
            </Helmet>
            <form
                action="https://app.convertkit.com/forms/1396761/subscriptions"
                className="seva-form formkit-form"
                method="post"
                data-sv-form="1396761"
                data-uid="7153c14513"
                data-version="5"
                data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;:&quot;message&quot;,&quot;success_message&quot;:&quot;Success! Now check your email to confirm your subscription.&quot;,&quot;redirect_url&quot;:&quot;&quot;},&quot;analytics&quot;:{&quot;google&quot;:null,&quot;facebook&quot;:null,&quot;segment&quot;:null,&quot;pinterest&quot;:null},&quot;modal&quot;:{&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;powered_by&quot;:{&quot;show&quot;:true,&quot;url&quot;:&quot;https://convertkit.com?utm_source=dynamic&amp;utm_medium=referral&amp;utm_campaign=poweredby&amp;utm_content=form&quot;},&quot;recaptcha&quot;:{&quot;enabled&quot;:false},&quot;return_visitor&quot;:{&quot;action&quot;:&quot;show&quot;,&quot;custom_content&quot;:&quot;&quot;},&quot;slide_in&quot;:{&quot;display_in&quot;:&quot;bottom_right&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;sticky_bar&quot;:{&quot;display_in&quot;:&quot;top&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15}},&quot;version&quot;:&quot;5&quot;}"
                min-width="400 500 600 700 800">
                <div data-style="clean">
                    <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
                    <h4 style={{ marginBottom: '.5rem' }}>Want to become a better developer?</h4>
                    <div data-element="fields" data-stacked="false" className="seva-fields formkit-fields">
                        <label className="formkit-field">
                            <span>First name</span>
                            <input className="formkit-input" name="first_name" aria-label="Your first name" placeholder="Your first name" type="text"
                                style={{ color: 'rgb(0, 0, 0)', borderColor: 'rgb(227, 227, 227)', borderRadius: '4px', fontWeight: 400 }} />
                        </label>
                        <label className="formkit-field">
                            <span>Email address</span>
                            <input className="formkit-input" name="email_address" placeholder="Your email address" required="" type="email"
                                style={{ color: 'rgb(0, 0, 0)', borderColor: 'rgb(227, 227, 227)', borderRadius: '4px', fontWeight: 400 }} />
                        </label>
                        <button data-element="submit" className="formkit-submit formkit-submit"
                            style={{ color: 'rgb(68, 68, 68)', backgroundColor: 'rgb(255, 193, 0)', borderRadius: '4px', fontWeight: 700 }}>
                            <div className="formkit-spinner"><div></div><div></div><div></div></div><span>Subscribe</span>
                        </button>
                    </div>
                    <a href="https://convertkit.com?utm_source=dynamic&amp;utm_medium=referral&amp;utm_campaign=poweredby&amp;utm_content=form" className="formkit-powered-by" data-element="powered-by" target="_blank" rel="noopener noreferrer">Powered By ConvertKit</a>
                </div>
            </form>
        </>
    )

}

export default Newsletter;