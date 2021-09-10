
 var init = { 
     'questions': [        
        {
           'question': 'How often do you have a drink containing alcohol? ',
           'answers': ['Never', 'Monthly or less ', '2 to 4 times a month ', '2 to 3 times a week ','4 or more times a week '],
		   'correctAnswer': 5
       },       

		{
            'question': 'How many drinks containing alcohol do you have on a typical day when you are drinking? ',
            'answers': ['1 or 2 ', '3 or 4 ', '5 or 6 ', '7, 8, or 9 ','10 or more'],
			  'correctAnswer': 5
       },
       {
           'question': 'How often do you have six or more drinks on one occasion?',
           'answers': [' Never ', 'Less than monthly ', 'Monthly ', 'Weekly ','Daily or almost daily '],
			  'correctAnswer': 5
       },
       {
           'question': 'How often during the last year have you found that you were not able to stop drinking once you had started?',
           'answers': ['Never ', 'Less than monthly', 'Monthly ', 'Weekly ','Daily or almost daily'],
		   'correctAnswer': 5
       },  
       {
           'question': 'How often during the last year have you failed to do what was normally expected from you because of drinking?',
           'answers': ['Never ', 'Less than monthly', 'Monthly ', 'Weekly ','Daily or almost daily'],
			  'correctAnswer': 5
       },

       {
           'question': 'How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session? ',
           'answers': ['Never ', 'Less than monthly', 'Monthly ', 'Weekly ','Daily or almost daily '],
			  'correctAnswer': 5
       },
      {
          'question': 'How often during the last year have you had a feeling of guilt or remorse after drinking?',
          'answers': ['Never ', 'Less than monthly', 'Monthly ', 'Weekly ', 'Daily or almost daily '],
			  'correctAnswer': 5
       },
       {
           'question': 'How often during the last year have you been unable to remember what happened the night before because you had been drinking?',
           'answers': ['Never ', 'Less than monthly', 'Monthly ', 'Weekly ', 'Daily or almost daily '],
			  'correctAnswer': 5
       },
       {
           'question': 'Have you or someone else been injured as a result of your drinking? ',
           'answers': ['No ', 'Yes, but not in the last year ','Yes, during the last year '],
			  'correctAnswer': 3
         },
         {
             'question': 'Has a relative or friend or a doctor or another health worker been concerned about your drinking or suggested you cut down?  ',
             'answers': ['No ', 'Yes, but not in the last year ', 'Yes, during the last year '],
             'correctAnswer': 3
         }

     ],
	  'resultComments' :  
	  {
          perfect: '<div class="row"><div><h2 class="blog-post-title">LOW SCORE</h2>               <span style="margin-bottom: 1.5rem; display: block; width: 20%; height: 5px; background-color: #edab00;"></span>                <div class="blog-post" style="word-wrap: break-word; word-break: normal;">                    <p class="lead">Your score is less than 7 and places you in the low risk category for alcohol problems. </p>                    <p class="lead">Congratulations on this. It is important that we all ensure that any alcohol we consume does not lead to a pattern of hazardous drinking or addictive drinking. Your score indicates that your consumption is within the low-risk range. It is important that you do not increase your present consumption: doing so can easily result in your drinking becoming hazardous and serious health problems occurring, and indeed, escalating over time. Paying attention to your alcohol consumption and ensuring it remains within the low risk range represents a great investment for your future.</p></div></div ></div>',
          excellent: '<div class="row"><div><h2 class="blog-post-title">MEDIUM SCORE</h2>               <span style="margin-bottom: 1.5rem; display: block; width: 20%; height: 5px; background-color: #edab00;"></span>                <div class="blog-post" style="word-wrap: break-word; word-break: normal;">                    <p class="lead">Your score is between 8 and 15 and places you in the category that we call “risky” or “hazardous” alcohol consumption. </p>                    <p class="lead">What this means is that your pattern of drinking or overall amount of alcohol you drink is putting you at risk of serious health and personal consequences. This may seem a surprise at first but it is the reality. We know that in your range of alcohol consumption there is a substantial risk of harm in the short-term (such as injuries) and in the long-term (such as diseases of the liver, heart, brain, muscle, nerves and other key organs and systems of the body). Indeed, you may already be experiencing the symptoms of these disorders and may or may not know about this.</p><p class="lead">We recommend as a starting point that you book an appointment with your medical doctor/physician. Your doctor will be able to assess you further and may organise blood tests to identify the damaging effects of alcohol on your body systems. Do not be distressed at this news. It is actually an opportunity to take stock of your alcohol consumption and make changes for the better. Most people with risky or hazardous alcohol consumption can reduce their drinking using straightforward and practical techniques that will substantially reduce their risk of harmful consequences. When people reduce their alcohol consumption from hazardous levels, they typically feel better and more in control of their lives.</p></div></div ></div>',
          good: '<div class="row"><div><h2 class="blog-post-title">HIGH SCORE</h2>               <span style="margin-bottom: 1.5rem; display: block; width: 20%; height: 5px; background-color: #edab00;"></span>                <div class="blog-post" style="word-wrap: break-word; word-break: normal;">                     <p class="lead">Your score is over 16 and shows that you are likely to have alcohol dependence. </p> <p class="lead">It is important that you take action on this, and we recommend that you seek an appointment with your medical doctor/physician. Your doctor will be able to determine the extent of your alcohol dependence and what action you should take and what treatment would be most appropriate. Your doctor is likely to advise that you abstain from alcohol and may well suggest you have blood tests to gauge the impact on your physical health. Alcohol dependence is a treatable condition and you may receive advice to engage in a treatment program, to take medications, to suppress the "driving force" of alcohol dependence, to enrol in a therapy program and to become involved with a self-help fellowship. We encourage you to seek advice as alcohol dependence can if untreated have a seriously progressive course. By contrast, people who engage in treatment can see their lives transformed and their health and well-being restored. We also encourage you to access the telephone advice lines and internet resources as are available in your own country.</p></div></div ></div>',
          average: '<div class="row"><div><h2 class="blog-post-title">HIGH SCORE</h2>               <span style="margin-bottom: 1.5rem; display: block; width: 20%; height: 5px; background-color: #edab00;"></span>                <div class="blog-post" style="word-wrap: break-word; word-break: normal;">                    <p class="lead">Your score is 0 and places you in the low risk category for alcohol problems. </p>                    <p class="lead">Congratulations on this. It is important that we all ensure that any alcohol we consume does not lead to a pattern of hazardous drinking or addictive drinking. Your score indicates that your consumption is within the low-risk range. It is important that you do not increase your present consumption: doing so can easily result in your drinking becoming hazardous and serious health problems occurring, and indeed, escalating over time. Paying attention to your alcohol consumption and ensuring it remains within the low risk range represents a great investment for your future.</p></div></div ></div>',	
	  }

 };