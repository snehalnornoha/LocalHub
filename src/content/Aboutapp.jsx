
function About_app() {
    return(
        <>
        <style>{`
               .about_container {
                    max-width: 700px;
                    margin: 0px;
                    padding: 30px;
                    
                }

                .about_container h2 {
                    margin: 0 0 20px;
                    font-size: 28px;
                    color: #ffffff;
                }

                .about_container p {
                    margin: 0 0 16px;
                    font-size: 15px;
                    line-height: 1.7;
                    color: #b8b8b8;
                }
           
                `}
</style>
        <div className="about_container">
        
            <h2>About Local Connect</h2>

            <p>
                Local Connect is a community-focused platform that connects
                local people, businesses, and organizations in one place.
            </p>

            <p>
                Users can discover local jobs, events, advertisements, alerts,
                and other important community notices based on their location.
            </p>

            <p>
                Our goal is to make local information easier to discover,
                share, and access while helping local businesses reach their
                community.
            </p>

        </div>
        </>
    )
    
}
export default About_app;