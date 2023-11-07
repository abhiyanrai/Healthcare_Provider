import React, { useState } from "react";

export default function SetupYourAccount() {
  const [currentStep, setCurrentStep] = useState(1);
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <main className="py-6 bg-surface-secondary Setup_Your_Account_container">
        <div className="container-fluid">
          <div className="card rounded">
            <div className="card-header">
              <form>
                {currentStep === 1 && (
                  <div>
                    <h2>1/5</h2>
                    <label>
                      <p className="fw-bold lh-sm">
                        Please take a moment to set up and personalize your
                        application by following these steps. Until the app is
                        setup it will not work.
                      </p>
                      <p className="fw-bold lh-sm " >
                        Step 1. Set up your calendar. Go to " Modal Settings and
                        click on "My Schedule", ten go to "Rooms". You may add
                        as many rooms or tables as you like and name them as you
                        see fit. Go to "Rooms" and click on the "+" sign on the
                        far right of the box, and then click on "Add". Type the
                        Name of the Treatment Room or Table number, etc. For
                        example, Treatment Room 1, Treatment Room 2,
                        Consultation, Waiting Room. If you have open adjusting,
                        "Treatment Table 1", etc. If you have a special room for
                        physiotherapy or Physical Therapy, then PT 1 for
                        example. I have created a room called "Waiting Room" for
                        new patients who need to fill out their intake forms,
                        etc.
                      </p>
                      <p>
                        Next, you will need to create you hours of operation or
                        "Clinic Schedule". Under "Clinic Schedule" use the
                        dropdown boxes to inputstart and ending times. To
                        schedule a break, simply make the ending time at the
                        time the break should begin, then click the "+" sign to
                        the right to enter the next shift. You may edit this at
                        any time clicking the Trash can symbol to start over.
                        Use the Vacations Tab to Program vacations or dates that
                        your office will be closed.
                      </p>
                      <p>
                        If you happen to be closed on a particular weekday,
                        simply do not enter any office hours. Please keep in
                        mind that if you see patients on your days off or during
                        breaks, ie. "Emergency Patient", you will not be able to
                        schedule during the breaks or times that are not
                        specifically denoted. In this case, you would want to
                        only enter a starting and ending time. Once you have
                        completed your schedule click the "Save" button on the
                        lower left of your screen.
                      </p>
                      <p>
                        You are now ready to enter your Holidays: This section
                        is relatively self-explanatory, but for those of you who
                        may feel a bit overwhelmed, it's super easy. Just click
                        on the "Holidays" tab in the Modal Settings under "My
                        Schedule", click the "Add" button, and then click in the
                        "Date" Box and choose the date from the dropdown
                        calender and then name the Holiday in the box on the
                        right. Finally, click the "Add Holiday" button and done!
                        (Please note that if you add a holiday, no patients will
                        be allowed on your appointment calendar on those dates.
                        In the event of an Emergency Patient, simply go to the
                        Holday settings again and click on the Trash Can symbol
                        next to the date and then schedule your patient."
                      </p>
                      <p>
                        Once you have completed setting up your Calendar Return
                        to the "Setup your Account" page found at the botom of
                        the menu list on the left side of the page and click the
                        "Next" button for further Instructions.
                      </p>
                    </label>
                    <br />
                    <button
                      className="btn btn-primary me-4 btn-sm mt-4"
                      type="button"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2>2/5</h2>
                    <label>
                      <p>
                        Now setup your "Consultation" page in the "Modal
                        Settings" first by clincking on the word "Consultation".
                        You will see Many drop-down menus.These can be
                        programmed with any type of information you wish to have
                        entered. Not all menus are necessary because you can
                        also type-in the patient's complaints. The drop-downs
                        are intended to reduce the amount of time you must spend
                        typing, therefore making your SOAP note function a bit
                        more efficient and accurate.
                      </p>
                      <p>
                        First Click on the arrow to the right on the "Symptoms"
                        box and Type the first symptom you wish to enter and
                        click on "Add other". Type the Symptom in the box, and
                        then click "Save". To Add another symptom, repeat the
                        steps stated above. If you make a mistake, no worries,
                        just click the "Edit" symbolto corredct the mistake or
                        the Trash Can symbol to erase the entry. (please keep in
                        mind that the order in which you make the entries is the
                        order in which they will show on your dropdown when
                        doing your consultation. Tip: When entering, either add
                        the symptoms you see most often in your practice or you
                        can do as we do and start from the top of the body and
                        go down to the feet starting with "Headaches" and ending
                        with "Symptoms in the Toes on the Left" - Dr. Chillson
                        is a bit OCD! ;-)) ) Feel free to add as many symptoms
                        as you wish.
                      </p>
                      <p>
                        Please follow the instructions above to enter data into
                        the additional boxes. "Other Therapists" means which
                        other Therapists or Doctors has the patient seen for the
                        condition for which they are seeing you. ForExample you
                        could give in "chiropractor", "physicaltherapist",
                        "orthopedist", etc. "Ago/Y,M,W,D" means Year, Years,
                        Month, Months, etc. You must put in the singular and
                        plural forms so your written daily notes and reports
                        look gramatically correct. "Warnings:" Are things that
                        you may want to see during your treatments so you know
                        what things to avaoid or what you wish to know about the
                        patient. For example: You might put in "Lumbar Disc
                        Herniation - follow disc protocols", "Osteoporosis",
                        etc., things you know you should be aware of every time!
                      </p>
                      <p>
                        Once you have completed this step, please return to the
                        "Setup Your Account" section and go to page 3/5.
                      </p>
                    </label>
                    <br />
                    <button
                      className="btn btn-primary me-4 btn-sm mt-4"
                      type="button"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                    <button
                      className="btn btn-primary btn-sm mt-4"
                      type="button"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h2>3/5</h2>
                    <label>
                      <p>
                        Congratulations! You are almost finished with the
                        account setup, just 2 more steps. It is time to set up
                        your "Services", thes will be categorized into New and
                        Regular Patient Services with some tips to make your
                        Calndar work a bit more efficiently. Please go to Modal
                        Settings and click on the word "Services". Below you
                        will find "Categories" and "Services". Click on the
                        Categories and add at least the Minimum following
                        Categories: "New Patient Services", "Existing Patient
                        Services", "Scoliosis", and "Accounting Services". You
                        may add any Category that you wish in addition to these
                        four. for example, you may do rehabilitation, physical
                        therapy or physiotherapy. If you have a seperate room or
                        additional time that you must book for the patient, then
                        simply add in "Rehabilitation Services" for example.
                      </p>
                      <p>
                        Now that you have your categories set up, start adding
                        services. You can make this as complicated or as easy as
                        you like. If you prefer, you can list every service that
                        you offer with its associated price or you can group
                        your servicices together and include just one price as
                        the total of all the services provided for the day. This
                        is the simplest and easiest way to add services, but
                        keep in mind that there are some countries that may
                        require a more detailed invoice. This is also meant for
                        a cash practice, so the requirements are not so
                        stringent. As Intellispine grows, we will be adding an
                        electronic insurance billing function to this app.
                      </p>
                      <p>
                        There are several Services that you should add for the
                        purpose of Scheduling only. Do not add any prices or tax
                        information when adding this service; just name the
                        service, choose the category for the service and click
                        "Save". These Services should be "Regular Patient 10
                        minutes" with the chosen category of "Existing Patient",
                        "Regular Patient 20 minutes" category "Existing Patient
                        Services", etc. And, do the same with your New Patient
                        Services including consultations, examinations and
                        treatments.
                      </p>
                      <p>
                        Now that you have the appointment time services set up,
                        continue to add your services and prices listed per
                        category. If you must pay a VAT or USt tax, under each
                        service you can input the tax rate for each particular
                        service. When you have finished entering your services,
                        please return to the "Setup Your Account" page and go to
                        Page 4/5 for further setup instructions.
                      </p>
                    </label>
                    <br />
                    <button
                      className="btn btn-primary me-4 btn-sm mt-4"
                      type="button"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                    <button
                      className="btn btn-primary me-4 btn-sm mt-4"
                      type="button"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                )}

                {currentStep === 4 && (
                  <div>
                    <h2>4/5</h2>
                    <label>
                      <p>
                        It is now time to set up your "Examination" and
                        "Diagnosis Codes". Please return to the Modal Settings
                        page and click on the word "Examination". Below you will
                        find particular headings. The first you will see is
                        "Listings" which are already pre-programmed with
                        thefollowing listings: PRS, PRI, PLS, and PLI. Although
                        these look like Gonstead listings, we use the listings a
                        bit differently, according to normal biomechanical
                        conditions, not the position of the bone in space. So,
                        when using P(L or R)I, this listing indicates that the
                        vertebra's spinous process is rotated towards the
                        concave side (Inside) of the curvature, P(L or R)S
                        indicates that the spinous is rotated towards the convex
                        side (outSide) of the curvature.
                      </p>
                      <p>
                        Feel free to add as many listing as you wish, but
                        understand that the meat of the program will only work
                        using the pre-programmed listing. As you learned in
                        training, you must also keep in mind that without a disc
                        herniation, prolapse, or some boney anomaly, the L4 and
                        5 vertebra will always turn to the concave or high
                        sacral side. L4 and 5will normally move together as a
                        unit with S1 and on the Exam and Daily notes you will
                        see L1 - 5 listed together and L1-3 and L4/5. At the
                        very least, L4/5 or L1-5 must have a listing to get a
                        proper response from the application.
                      </p>
                      <p>
                        Shoulder muscle tests are pre-programmed with the
                        rotator cuff and major shoulder muscles. You may add or
                        delete any muscle that you wish. Should you choose to
                        add specific orthopedic tests to your examination,
                        please add them here.
                      </p>
                      <p>
                        Diagnosis codes made easy! There are 2 ways to add
                        diagnosis codes to your Intellispine App.: 1. Manual
                        (Not so easy to put them all in, but you can certainly
                        update your codes manually once you have uploaded your
                        list), 2. Upload your list using Excel or Google Sheets.
                        Step 1: Click on the "Download CSV Format" to the right
                        of the word "Diagnosis", Step 2: Making note of where
                        you downloaded your file to and open the Excel File. If
                        you do not have Excel, do not open the file, simply go
                        to your Google Drive and Create a new file called
                        "Diagnosis Codes" by clicking "New" in the menu on the
                        left and then "New Folder". Open the folder and again
                        choose "New", but this time choose "File Upload" and
                        upload the downloaded Excel file. Step3: Add your
                        Diagnosis codes including the description together in
                        Column A of the Excel form.
                      </p>
                      <p>
                        Step 4 for Excel Users: click on "File" on the menu
                        usually to the upper far left. A new menu option will
                        pop up on the left as a whole new page. Choose "Export",
                        then "Change File Type" and choose on the lower right
                        side of your options "CSV (Comma Delimited)" option and
                        click the Save button below. Give the file the name you
                        like the best making note of its location. (New
                        Paragraph) Step 4 for Google sheets users : Open the
                        file you just uploaded and add your diagnosis codes and
                        description into Column A. Then close the file, right
                        click on the file, hover over "download and choose
                        "Comma-Seperated Values (.csv)" and put in a file
                        location you can remember.
                      </p>
                      <p>
                        Now simply click the "Import" button in the Intellispine
                        App next to the "Download csv format" link. Choose the
                        .csv file you just created and click on the "Open"
                        button on the bottom right of the Window. Done! Now if
                        you click on the dropdown list, it will take a second,
                        the choices will all appear
                      </p>
                      <p>
                        If you find that you have too much difficulty organizing
                        and uploading your diagnosis codes, please feel free to
                        download our copy under the following link: (See Link in
                        the next row) . Please Return to the "Setup Your
                        Account" page and open Page 5/5 for further Tips and
                        Instructions.
                      </p>
                    </label>
                    <br />
                    <button
                      className="btn btn-primary me-4 btn-sm mt-4"
                      type="button"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                    <button
                      className="btn btn-primary me-4 btn-sm mt-4"
                      type="button"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                )}

                {currentStep === 5 && (
                  <div>
                    <h2>5/5</h2>
                    <small>
                      Review your information before submitting:
                    </small>{" "}
                    <br />
                    <label>
                      <p>Adding Providers</p>
                      <p>
                        You should note that you can add up to 3 healthcare
                        providersper office in addition to the practice owner to
                        your provider list. Go to the menu on the left anch
                        click on "Healthcare Providers", from there it is
                        relatively self-explanatory. On the upper right hand
                        side of the page clic on the "Add Healthcare Provider
                        and fill out the information requested. (Tip) The app
                        will ask you for an email address for the provider. As
                        the practice owner, I would recommend that you keep the
                        email addresses "in-house". This means that you should
                        set up an email address for each provider that can be
                        accessed by your practice. If you have Gmail, please
                        click the following link for instructions on how to do
                        this: https://youtu.be/Ma6i510nPo4?si=2S1j1VPHQHYj4kNF .
                        It would be easy enough on this form to enter (your main
                        email address without the @ sign).(the last name of your
                        healthcare provider)@gmail.com. Example:
                        intellispine.chillson@gmail.com.
                      </p>
                      <p>
                        Now that you have added your providers, you can start
                        building appointments! keep in mind that your
                        appointment calendar should be the hub of your
                        activities. When adding an appointment, there are two
                        categories to choose from: "New" & "Regular". New is to
                        enter New Patients and Regular is for existing patients.
                        Bes sure that when you create an appointment that you
                        have clicked on the correct link.
                      </p>
                      
                    </label>
                    <br />
                    <button
                      className="btn btn-primary me-4 btn-sm mt-4"
                      type="button"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                    <button
                      className="btn btn-primary me-4 btn-sm mt-4"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
