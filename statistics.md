# Statistics
topic: statistics
ksb: K13, S10

How to edit this file
- Cards are separated by a line containing only three dashes.
- Each card has: id (never change it once you've started studying, or progress is lost), concept, type, optional ksb and distinction, then Q: and A:.
- Types: definition, formula, distinguish, when, pitfall, scenario, justify, project.
- Maths goes between $...$ (inline) or $$...$$ (own line). Bullets start with "- ". Tables use | pipes |.

---
id: stats-desc-vs-inf
concept: Descriptive vs inferential
type: distinguish
distinction: yes
Q: What is the difference between **descriptive** and **inferential** statistics?
A: **Descriptive statistics** summarise the data you actually have: averages, spread, counts, charts. They make no claim beyond that dataset.

**Inferential statistics** use a **sample** to draw conclusions about a wider **population**, with a stated level of uncertainty (confidence intervals, hypothesis tests, p-values).

Rule of thumb: describing *these* respondents → descriptive. Claiming something about *all* staff from those respondents → inferential.

---
id: stats-desc-decisions
concept: Descriptive statistics
type: justify
distinction: yes
Q: How do descriptive statistics help decision-making? Give a structure you could use in your professional discussion.
A: Descriptive statistics turn raw data into a few numbers a decision-maker can act on.
- **Centre** (mean/median): what is typical? e.g. median time to hire.
- **Spread** (SD/IQR/range): how consistent is it? A high spread means a single average hides real differences.
- **Shape and outliers**: is the data skewed, and are there unusual cases that need attention?
- **Comparison**: centre and spread side by side across groups, e.g. departments.

Structure: *what I measured → which statistic and why → what it showed → what decision it supported → the alternative I considered.*

---
id: stats-pop-sample
concept: Population vs sample
type: definition
Q: Define **population**, **sample**, **parameter** and **statistic**.
A: - **Population**: every member of the group you want to draw conclusions about (e.g. all 2,000 employees).
- **Sample**: the subset you actually have data on (e.g. 450 survey respondents).
- **Parameter**: a true value for the population, usually unknown (e.g. $\mu$, $\sigma$).
- **Statistic**: a value calculated from the sample, used to estimate the parameter (e.g. $\bar{x}$, $s$).

Memory hook: **P**opulation → **P**arameter; **S**ample → **S**tatistic.

---
id: stats-notation
concept: Notation
type: formula
Q: Give the usual symbols for the mean, standard deviation, variance and size of a **sample** vs a **population**.
A: | | Sample | Population |
|---|---|---|
| Mean | $\bar{x}$ | $\mu$ |
| Standard deviation | $s$ | $\sigma$ |
| Variance | $s^2$ | $\sigma^2$ |
| Size | $n$ | $N$ |

Greek letters are for population parameters; Latin letters are for sample statistics.

---
id: stats-mean-def
concept: Mean
type: formula
Q: What is the arithmetic mean, and what is its formula?
A: The sum of the values divided by how many there are: the "balance point" of the data.

$$\bar{x} = \frac{\sum_{i=1}^{n} x_i}{n}$$

It uses every value, which makes it efficient but **sensitive to outliers and skew**.

---
id: stats-median-def
concept: Median
type: definition
Q: What is the median, and how do you find it when $n$ is even?
A: The middle value when the data are sorted. Half the values are below it and half above.

- $n$ odd: the value at position $\frac{n+1}{2}$.
- $n$ even: the mean of the two middle values.

Example: 3, 5, **7, 9**, 12, 40 → median = (7 + 9) ÷ 2 = **8**.

---
id: stats-mode-when
concept: Mode
type: when
Q: When is the **mode** the most useful average?
A: - For **nominal (categorical)** data, where a mean or median is meaningless, e.g. the most common reason for leaving.
- When you want the most typical *actual* value, e.g. the most common contract length.
- To spot **bimodal** data (two peaks), which can suggest two distinct groups mixed together.

Limitations: there may be no mode or several, and it ignores most of the data.

---
id: stats-mean-vs-median
concept: Mean vs median
type: when
Q: When should you report the **median** rather than the **mean**?
A: When the data are **skewed** or contain **outliers**, because the median is *resistant* to extreme values and the mean is pulled towards them.

Typical examples: salaries, time to hire, house prices, sick days (most people have few, a few have many).

Also use the median for **ordinal** data (e.g. rating scales), where the distance between points isn't guaranteed to be equal.

Use the mean when data are roughly symmetrical and interval/ratio, because it uses all the information.

---
id: stats-salary-scenario
concept: Mean vs median
type: scenario
Q: Five team salaries: £28k, £30k, £31k, £33k, £120k. A manager says "average pay is £48k". What's the problem, and what would you report?
A: The mean (£242k ÷ 5 = **£48.4k**) is dragged up by one outlier (£120k). Four of the five earn less than £34k, so the mean misrepresents "typical" pay.

Report the **median (£31k)**, ideally alongside the range or IQR, and mention the outlier explicitly. If the mean is needed (e.g. for total pay budgeting), present it with that context.

---
id: stats-skew
concept: Skewness
type: definition
Q: What is **positive (right) skew** vs **negative (left) skew**, and how do mean and median relate in each?
A: - **Positive / right skew**: a long tail to the right (a few very high values). Usually **mean > median**. e.g. salaries, absence days.
- **Negative / left skew**: a long tail to the left (a few very low values). Usually **mean < median**. e.g. scores on an easy test.
- **Symmetrical**: mean ≈ median.

The tail names the skew: the mean is pulled towards the tail.

---
id: stats-levels
concept: Levels of measurement
type: distinguish
Q: Name the four levels of measurement, with an example of each and the averages that are valid for each.
A: | Level | Meaning | Example | Valid averages |
|---|---|---|---|
| Nominal | Categories, no order | Department | Mode |
| Ordinal | Ordered, gaps not equal | Likert scale, pay band | Mode, median |
| Interval | Equal gaps, no true zero | Temperature °C | Mode, median, mean |
| Ratio | Equal gaps, true zero | Salary, age, tenure | All; ratios are meaningful too |

The level of measurement drives your choice of descriptive statistics *and* of statistical test.

---
id: stats-likert
concept: Likert data
type: pitfall
Q: Is it OK to calculate a **mean** of Likert-scale survey responses (1 = strongly disagree … 5 = strongly agree)?
A: Strictly, Likert items are **ordinal**: the gap between "agree" and "strongly agree" isn't necessarily the same as between "neutral" and "agree". So the **median, mode and % agreeing** are the safest summaries.

In practice, means are widely reported, especially for **scales** made by averaging several items, which behave more like interval data.

A good answer acknowledges the debate: *"I reported % favourable and the median because the data are ordinal; I also showed means for trend comparison, noting the assumption."* That is a distinction-style justification with an alternative.

---
id: stats-range-iqr
concept: Range and IQR
type: formula
Q: Define the **range** and the **interquartile range (IQR)**. Why is the IQR often preferred?
A: $$\text{Range} = \max - \min \qquad \text{IQR} = Q_3 - Q_1$$

- $Q_1$ = 25th percentile, $Q_3$ = 75th percentile. The IQR is the spread of the **middle 50%** of the data.
- The range depends on just two values, so a single outlier changes it a lot.
- The IQR ignores the extreme 25% at each end, so it is **resistant to outliers**. It pairs naturally with the **median**.

---
id: stats-outlier-rule
concept: Outliers
type: formula
Q: What is the **1.5 × IQR rule** for identifying outliers?
A: A value is a potential outlier if it is:

$$x < Q_1 - 1.5 \times \text{IQR} \quad \text{or} \quad x > Q_3 + 1.5 \times \text{IQR}$$

These limits are the "fences" used to draw the whiskers on a **box plot**.

An outlier is a flag to **investigate**, not to delete automatically: it could be an error (fix it), a genuine extreme (keep it, maybe report it separately) or a different population (analyse separately).

---
id: stats-outlier-handling
concept: Outliers
type: scenario
Q: Your absence data shows one employee with 240 sick days in a year. What do you do?
A: 1. **Check validity**: 240 working days is close to a full year. Is it a data entry error, or long-term sickness?
2. **Check with the data owner** rather than assuming.
3. If it's an error: correct it, document the correction, and raise the data quality issue at source.
4. If it's genuine: keep it, but use **resistant statistics** (median, IQR), or report long-term absence separately from short-term absence, because they need different interventions.
5. **Document** your decision so the analysis is reproducible.

Also note that this is likely **special category (health) data**, so handle and aggregate it carefully.

---
id: stats-variance-def
concept: Variance
type: formula
Q: What does **variance** measure, and what is the population formula?
A: The **average squared distance** of each value from the mean.

$$\sigma^2 = \frac{\sum (x_i - \mu)^2}{N}$$

Deviations are squared so negatives don't cancel positives, and so larger deviations count more. Downside: the units are squared (e.g. £²), which is hard to interpret. That's why we usually report the **standard deviation**, its square root.

---
id: stats-sd-def
concept: Standard deviation
type: definition
Q: What does the **standard deviation** tell you?
A: How spread out values typically are **around the mean**, in the **same units as the data**.

- Small SD → values cluster tightly around the mean (consistent).
- Large SD → values are widely spread (variable).

It is the square root of the variance. It pairs naturally with the **mean**, and like the mean it is **sensitive to outliers**.

---
id: stats-sd-pop-formula
concept: Standard deviation
type: formula
Q: Write the formula for the **population** standard deviation.
A: $$\sigma = \sqrt{\frac{\sum_{i=1}^{N} (x_i - \mu)^2}{N}}$$

Steps: subtract the mean from each value → square → sum → divide by $N$ → square root.

---
id: stats-sd-sample-formula
concept: Standard deviation
type: formula
Q: Write the formula for the **sample** standard deviation. What is different from the population version?
A: $$s = \sqrt{\frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n - 1}}$$

Two differences:
- It uses the sample mean $\bar{x}$ rather than $\mu$.
- It divides by $n - 1$ rather than $N$ (**Bessel's correction**).

In Excel: `STDEV.S` (sample) vs `STDEV.P` (population). In Power BI DAX: `STDEV.S` vs `STDEV.P`. In pandas, `.std()` defaults to the sample version (ddof=1).

---
id: stats-bessel
concept: Standard deviation
type: definition
Q: Why does the sample SD divide by $n-1$ instead of $n$?
A: A sample's values are, on average, closer to **their own mean** $\bar{x}$ than to the true population mean $\mu$, because $\bar{x}$ is calculated from those same values. Dividing by $n$ would therefore **underestimate** the population's spread.

Dividing by $n-1$ (**Bessel's correction**) makes the sample variance an **unbiased** estimate of the population variance.

Linked idea: **degrees of freedom**. Once $\bar{x}$ is fixed, only $n-1$ values are free to vary.

The effect matters most for **small samples**. With $n = 1{,}000$ the difference is tiny.

---
id: stats-sd-sample-or-pop
concept: Standard deviation
type: when
Q: How do you decide whether to use the **sample** or **population** standard deviation?
A: Ask: **"Do I want to describe only these data, or generalise beyond them?"**

- **Population SD ($\sigma$, STDEV.P)**: your data *is* the whole group you care about, and you're only describing it. e.g. tenure of **all** current employees from the HR system.
- **Sample SD ($s$, STDEV.S)**: your data is a subset and you want to estimate the spread in a larger group. e.g. survey respondents standing in for all staff, or this year's data used to predict future years.

If in doubt in an inferential context, use the **sample** SD. It's the default in most tools and tests.

---
id: stats-sd-scenario-hr
concept: Standard deviation
type: scenario
Q: You have the HR system extract for **all 1,840 current employees**, and you want to describe how long-serving the workforce is. Sample or population SD? Does it matter much?
A: **Population SD** is technically correct, because you have every current employee and you are only describing them.

With $N = 1{,}840$, dividing by 1,839 instead of 1,840 makes a negligible difference, so the choice barely changes the number.

It **would** become a sample if you treated current staff as representative of future workforces, or used the data in an inferential test.

Good EPA point: show you know the distinction *and* when it does and doesn't matter in practice.

---
id: stats-sd-scenario-teams
concept: Standard deviation
type: scenario
Q: Two teams both have a mean engagement score of 3.8 / 5. Team A's SD is 0.4; Team B's SD is 1.6. What would you tell a stakeholder?
A: The averages are identical but the **experiences are very different**:
- **Team A** (SD 0.4): views are consistent; most people are close to 3.8.
- **Team B** (SD 1.6): views are polarised; some are very positive and some very negative.

Recommendation: look inside Team B (by role, location, manager or tenure) before acting. A team-wide intervention might miss the people who are struggling.

Lesson: **never report an average without a measure of spread.**

---
id: stats-sd-pitfall-skew
concept: Standard deviation
type: pitfall
Q: Why can the standard deviation be misleading for skewed data, such as salaries?
A: - The SD is built on the **mean**, which the long tail pulls away from the typical value.
- **Squaring** the deviations gives extreme values a large influence, inflating the SD.
- "Mean ± 1 SD" can even produce impossible values, e.g. a negative number of absence days.

Better: **median and IQR**, or a box plot/histogram, or consider a log transformation for modelling.

---
id: stats-empirical-rule
concept: Normal distribution
type: definition
Q: What is the **68–95–99.7 rule**? When does it apply?
A: For a **normal (bell-shaped)** distribution:
- about **68%** of values lie within ±1 SD of the mean
- about **95%** within ±2 SD (more precisely ±1.96 SD)
- about **99.7%** within ±3 SD

It only applies to data that are approximately normal. Don't use it on heavily skewed data. Check with a histogram first.

---
id: stats-normal-props
concept: Normal distribution
type: definition
Q: List the key properties of the **normal distribution**.
A: - Symmetrical and bell-shaped.
- Mean = median = mode, at the centre.
- Defined completely by its **mean** ($\mu$) and **SD** ($\sigma$).
- Tails extend infinitely but get very thin (68–95–99.7 rule).
- Many **parametric tests** (e.g. t-tests) assume normality, of the data or of the sampling distribution.

Ways to check: histogram, Q-Q plot, comparing mean vs median, or a formal test such as Shapiro–Wilk.

---
id: stats-zscore
concept: Z-score
type: formula
Q: What is a **z-score**, and what is its formula?
A: How many standard deviations a value is from the mean.

$$z = \frac{x - \mu}{\sigma} \quad \text{(or } \frac{x - \bar{x}}{s} \text{ for a sample)}$$

- $z = 0$: exactly average. $z = +2$: 2 SDs above the mean.
- Lets you **compare values on different scales**, e.g. a score on two different surveys.
- $|z| > 3$ is a common outlier flag for roughly normal data.

---
id: stats-zscore-scenario
concept: Z-score
type: scenario
Q: Mean sick days = 6, SD = 2. Employee X has 11 days. Calculate their z-score and interpret it.
A: $$z = \frac{11 - 6}{2} = 2.5$$

Employee X is **2.5 standard deviations above** the mean, which would be unusual *if* the data were normal (roughly the top 1%).

Caveat: absence data is usually **right-skewed**, so the normal interpretation may overstate how unusual this is. Check the distribution first.

---
id: stats-cv
concept: Coefficient of variation
type: formula
Q: What is the **coefficient of variation (CV)** and when would you use it?
A: $$CV = \frac{s}{\bar{x}} \times 100\%$$

The SD expressed relative to the mean, so it has **no units**.

Use it to compare variability between groups with **very different means or units**. e.g. which varies more relative to its size: the training spend in a 20-person team or in a 2,000-person division?

Only meaningful for **ratio** data with a mean well above zero.

---
id: stats-justify-desc
concept: Choosing descriptive statistics
type: justify
distinction: yes
ksb: S10
Q: **Distinction (S10):** "Justify your choice of descriptive statistics for the data and business problem, presenting possible alternatives." Give a model answer structure.
A: 1. **Data**: what type (level of measurement), size, distribution (skewed? outliers?).
2. **Business question**: what does the stakeholder need, typical value, consistency, or comparison?
3. **Choice and reason**: e.g. "I used the **median and IQR** because time to hire was right-skewed by a few hard-to-fill roles."
4. **Alternative and why not**: "The **mean and SD** would have overstated typical time to hire by about X days."
5. **Impact**: what the stakeholder did with it.

Key phrase pattern: *"I chose ___ because the data were ___; I considered ___ but rejected it because ___."*

---
id: stats-sampling-methods
concept: Sampling
type: distinguish
Q: Describe **simple random**, **stratified**, **cluster**, **systematic** and **convenience** sampling.
A: - **Simple random**: every member has an equal chance of selection.
- **Stratified**: split the population into groups (e.g. by department), then sample randomly within each, so that every group is represented proportionately.
- **Cluster**: randomly select whole groups (e.g. three offices) and include everyone in them. Cheaper, but less precise.
- **Systematic**: every *k*th item from a list. Watch out for hidden patterns in the list order.
- **Convenience**: whoever is easiest to reach. Quick, but high risk of **bias**.

Staff surveys are usually **self-selecting**, a form of convenience sampling, which is why response rate and representativeness matter.

---
id: stats-sampling-bias
concept: Sampling bias
type: pitfall
Q: What is **non-response / self-selection bias**, and how can you check for it in a staff survey?
A: People who choose to respond may differ systematically from those who don't, e.g. the very engaged and the very unhappy respond while the middle doesn't. Results then don't represent the population.

Checks and mitigations:
- Compare the respondent **profile** (department, grade, location, tenure) against the HR population.
- Report the **response rate** per group, and avoid reporting groups below a minimum size.
- **Weight** the results to the population profile if the differences are large.
- State the limitation clearly in your conclusions.

---
id: stats-se
concept: Standard error
type: formula
Q: What is the **standard error of the mean**, and how is it different from the standard deviation?
A: $$SE = \frac{s}{\sqrt{n}}$$

- **SD**: the spread of **individual values** in the data.
- **SE**: the spread of the **sample mean** if you repeated the sampling many times. It measures how precise your estimate of the mean is.

Larger samples → smaller SE → more precise estimate. Because of the $\sqrt{n}$, you need **4× the sample size to halve the SE**.

---
id: stats-clt
concept: Central limit theorem
type: definition
Q: What does the **central limit theorem (CLT)** say, and why does it matter?
A: For a reasonably large sample (a common rule of thumb is $n \geq 30$), the **distribution of sample means** is approximately **normal**, *even if the underlying data are not normal*. It is centred on $\mu$ with spread $SE = \sigma / \sqrt{n}$.

Why it matters: it's what allows **confidence intervals and t-tests** on means to work with large samples of skewed data, e.g. absence or salary data.

It doesn't fix **bias** in the sample, and with heavy skew you may need larger $n$.

---
id: stats-ci-formula
concept: Confidence interval
type: formula
Q: Give the formula for a **95% confidence interval** for a mean (large sample).
A: $$\bar{x} \pm 1.96 \times \frac{s}{\sqrt{n}}$$

i.e. estimate ± (critical value × standard error). The part after ± is the **margin of error**.

For small samples, replace 1.96 with the **t critical value** for $n-1$ degrees of freedom (slightly larger, giving a wider interval).

Example: $\bar{x} = 3.6$, $s = 0.9$, $n = 400$ → $SE = 0.045$ → CI = 3.6 ± 0.088 → **(3.51, 3.69)**.

---
id: stats-ci-interpret
concept: Confidence interval
type: pitfall
Q: What is the correct way to interpret a 95% confidence interval of (3.51, 3.69)? What is the common mistake?
A: **Correct:** "If we repeated the sampling many times, about 95% of intervals built this way would contain the true population mean. We are 95% confident it lies between 3.51 and 3.69."

**Common mistake:** "There is a 95% probability that the true mean is in *this* interval." Strictly, the true mean is fixed: this particular interval either contains it or doesn't. The 95% describes the **method's** long-run success rate.

For stakeholders: *"Our best estimate is 3.6, and the true figure is very likely between 3.5 and 3.7."*

---
id: stats-ci-width
concept: Confidence interval
type: when
Q: What makes a confidence interval **wider** or **narrower**?
A: | Change | Effect on width |
|---|---|
| Larger sample $n$ | Narrower |
| More variable data (larger $s$) | Wider |
| Higher confidence level (99% vs 95%) | Wider |

Business use: comparing small teams' survey scores gives **wide intervals**, so apparent differences between them may just be noise. Showing error bars helps stop stakeholders over-reading small gaps.

---
id: stats-hypotheses
concept: Hypothesis testing
type: definition
Q: Define the **null hypothesis** ($H_0$) and the **alternative hypothesis** ($H_1$). Give an HR example.
A: - $H_0$: there is **no effect / no difference / no relationship**. It's the default assumption.
- $H_1$: there **is** an effect / difference / relationship.

Example: does a new onboarding programme improve 6-month retention?
- $H_0$: retention is the same with or without the programme.
- $H_1$: retention differs (two-tailed) / is higher (one-tailed) with the programme.

We test whether the data provide enough evidence to **reject $H_0$**.

---
id: stats-test-steps
concept: Hypothesis testing
type: definition
Q: List the steps of a hypothesis test.
A: 1. State $H_0$ and $H_1$.
2. Choose the **significance level** $\alpha$ (e.g. 0.05) **before** looking at the results.
3. Choose the right **test**, based on the data type, number of groups, paired or independent samples, and assumptions.
4. Check the test's **assumptions**.
5. Calculate the **test statistic** and **p-value**.
6. **Decide**: if $p \leq \alpha$, reject $H_0$; otherwise fail to reject $H_0$.
7. **Interpret in context**, including **effect size** and practical significance, plus limitations.

---
id: stats-pvalue
concept: p-value
type: definition
Q: What is a **p-value**?
A: The probability of getting results **at least as extreme as those observed**, **assuming the null hypothesis is true**.

- Small p (e.g. ≤ 0.05) → the data would be surprising if $H_0$ were true → evidence against $H_0$.
- Large p → the data are consistent with $H_0$. Not proof that $H_0$ is true.

---
id: stats-pvalue-myths
concept: p-value
type: pitfall
Q: Name three common **misinterpretations** of a p-value.
A: 1. ❌ "p = 0.03 means there's a 3% chance $H_0$ is true." The p-value assumes $H_0$ is true; it isn't the probability *of* $H_0$.
2. ❌ "A small p means a large or important effect." With a big sample, tiny trivial differences become significant. Look at the **effect size**.
3. ❌ "p > 0.05 proves there's no difference." It means **not enough evidence**. The sample may simply be too small (low **power**).

Also: p = 0.049 and p = 0.051 are practically the same evidence. Avoid treating 0.05 as a magic cliff edge.

---
id: stats-reject-wording
concept: Hypothesis testing
type: pitfall
Q: Why do we say "**fail to reject** $H_0$" rather than "**accept** $H_0$"?
A: A non-significant result means the evidence wasn't strong enough to rule out "no difference". It doesn't show that there truly is no difference. Absence of evidence is not evidence of absence.

Analogy: a "not guilty" verdict means not proven, not proven innocent.

Plain-English version for stakeholders: *"We didn't find clear evidence of a difference with this sample."*

---
id: stats-tails
concept: One- vs two-tailed tests
type: distinguish
Q: What is the difference between a **one-tailed** and a **two-tailed** test? Which should you usually use?
A: - **Two-tailed**: $H_1$ is "there is a difference" in **either direction**. $\alpha$ is split between both tails.
- **One-tailed**: $H_1$ specifies a direction ("higher", "lower"). All of $\alpha$ sits in one tail, so it's easier to get significance in that direction, but you can't detect an effect the other way.

Use **two-tailed by default**. Only use one-tailed if the direction was decided **before** seeing the data **and** an effect in the other direction would be irrelevant. e.g. training could plausibly make things worse, so two-tailed is safer.

---
id: stats-alpha
concept: Significance level (alpha)
type: definition
Q: What is the **significance level** $\alpha$?
A: The threshold you set **in advance** for rejecting $H_0$. It's also the probability of a **Type I error** (a false positive) you're willing to accept.

- $\alpha = 0.05$: accept a 5% risk of concluding there's an effect when there isn't.
- Common choices: 0.10, 0.05, 0.01.

It must be set **before** analysing the data. Choosing it afterwards to get the "right" answer is p-hacking.

---
id: stats-errors
concept: Type I and Type II errors
type: distinguish
Q: What are **Type I** and **Type II** errors? Give an HR example of each.
A: | | $H_0$ actually true | $H_0$ actually false |
|---|---|---|
| Reject $H_0$ | **Type I error** (false positive), probability $\alpha$ | Correct ✔ (power, $1-\beta$) |
| Fail to reject $H_0$ | Correct ✔ | **Type II error** (false negative), probability $\beta$ |

Example (does a wellbeing programme reduce absence?):
- **Type I**: conclude it works when it doesn't → money spent rolling out something ineffective.
- **Type II**: conclude no effect when it does work → a useful programme is scrapped.

Lowering $\alpha$ reduces Type I errors but **increases** Type II errors, unless you increase the sample size.

---
id: stats-alpha-choice
concept: Significance level (alpha)
type: justify
distinction: yes
ksb: S10
Q: **Distinction (S10):** "Explain your choice of alpha level in the context of the risk associated with decisions." How would you argue for 0.01, 0.05 or 0.10?
A: Choose $\alpha$ by asking **which mistake is more costly**:

- **Stricter, $\alpha = 0.01$**: when a **false positive** is costly or hard to reverse. e.g. concluding a pay gap exists or doesn't in a legal or equal-pay context, or a decision triggering an expensive, organisation-wide change.
- **$\alpha = 0.05$**: the conventional balance when neither error is especially costly; widely understood by stakeholders.
- **More lenient, $\alpha = 0.10$**: when **missing a real effect** is more costly than a false alarm and the action is cheap and reversible. e.g. an exploratory pilot to decide whether something is worth investigating further.

Also mention: small samples have low **power**, and a stricter $\alpha$ makes Type II errors more likely. And remember that the more tests you run, the more likely one is significant by chance.

---
id: stats-power
concept: Statistical power
type: definition
Q: What is **statistical power**, and what increases it?
A: Power = $1 - \beta$: the probability of **detecting a real effect** when one exists. 0.8 (80%) is a common target.

Power increases with:
- a **larger sample size** (the main lever)
- a **larger true effect size**
- **less variability** in the data
- a **higher $\alpha$** (at the cost of more false positives)
- a one-tailed test (if justified)

Practical point: a small team's survey may simply lack the power to show significant differences, so "not significant" may just mean "too small to tell".

---
id: stats-practical-sig
concept: Effect size
type: distinguish
Q: What is the difference between **statistical significance** and **practical significance**? Name one effect size measure.
A: - **Statistical significance**: the effect is unlikely to be due to chance alone ($p \leq \alpha$). Says nothing about **size**.
- **Practical significance**: the effect is big enough to **matter** for the business.

With a large sample, a 0.05-point rise in engagement can be "significant" yet meaningless.

Effect size measures:
- **Cohen's d**: difference in means ÷ pooled SD. Rough guide: 0.2 small, 0.5 medium, 0.8 large.
- **r** or **r²** for correlations; **Cramér's V** for chi-square.

Best practice: report the p-value **and** the effect size **and** a confidence interval.

---
id: stats-hyp-importance
concept: Hypothesis testing
type: justify
distinction: yes
ksb: K13
Q: **Distinction (K13):** "Discuss the importance of hypothesis testing in data analysis and its implications for drawing conclusions."
A: **Why it matters:**
- It separates **real patterns from random noise** before decisions are made.
- It gives a **consistent, transparent decision rule** ($\alpha$ set in advance), which reduces cherry-picking.
- It **quantifies uncertainty**, so stakeholders know how confident to be.

**Implications and limits for conclusions:**
- Significance ≠ importance → also report the **effect size**.
- Non-significance ≠ no effect → consider **power** and sample size.
- Correlation ≠ causation, even if significant.
- Results depend on **assumptions** being met and on the sample being **representative**.
- Many tests → more false positives (**multiple comparisons**).

Close with: *"I used the test to support, not replace, judgement, combining it with effect size and business context."*

---
id: stats-parametric
concept: Parametric vs non-parametric
type: distinguish
Q: What is the difference between **parametric** and **non-parametric** tests?
A: - **Parametric** tests assume the data (or sampling distribution) follow a particular distribution, usually **normal**, and use interval/ratio data. They're more **powerful** when the assumptions hold.
- **Non-parametric** tests make fewer assumptions and work on **ranks**. Use them for **ordinal data, small samples, heavy skew or outliers**.

In your core set: the **t-tests** and **Pearson's r** are parametric. **Chi-square** works on counts of categories, so normality doesn't apply.

If a parametric test's assumptions clearly fail (small, heavily skewed sample), say so as a **limitation** and note that a non-parametric equivalent exists. For your scope, that awareness is enough.

---
id: stats-ttest-assumptions
concept: t-test
type: definition
Q: What are the **assumptions** of an independent-samples t-test?
A: 1. The dependent variable is **continuous** (interval/ratio).
2. The two groups are **independent** (different people in each).
3. Data in each group are approximately **normal**, or samples are large enough for the CLT to apply.
4. **Similar variances** in both groups. If not, use **Welch's t-test**, which doesn't assume equal variances and is often recommended as the default.
5. Observations are independent of each other.

If assumptions fail: use Welch's version for unequal variances; rely on a large sample (CLT) for skew; and with small, skewed or ordinal data, state the limitation (a non-parametric test would be the usual alternative).

---
id: stats-ttest-types
concept: t-test
type: distinguish
Q: When do you use a **one-sample**, **independent-samples** and **paired** t-test?
A: - **One-sample**: compare one group's mean with a fixed value. e.g. is our average time to hire different from the 28-day target?
- **Independent-samples**: compare the means of two **separate** groups. e.g. engagement for remote vs office-based staff.
- **Paired**: compare two measurements on the **same** people. e.g. confidence scores before and after a training course.

Key question: **same people measured twice → paired; different people → independent.**

---
id: stats-ttest-scenario
concept: t-test
type: scenario
Q: 60 managers rate their confidence (0–100 scale) before and after a leadership course. Which test, and why? What's a weakness of this design?
A: **Paired t-test**, because the same 60 people are measured twice, so the scores are related. It tests whether the **mean of the differences** is zero.

Weakness: with **no control group**, any improvement might be due to time, other changes, or people telling you what you want to hear (**social desirability**), not the course. Better design: compare with a group who haven't yet attended.

---
id: stats-chisq
concept: Chi-square test
type: when
Q: When do you use a **chi-square test of independence**? What is its main assumption?
A: To test whether two **categorical** variables are related. e.g. is leaver/stayer status related to department? Is training completion related to contract type?

It compares the **observed** counts in a contingency table with the **expected** counts if there were no relationship:

$$\chi^2 = \sum \frac{(O - E)^2}{E}$$

Assumptions: independent observations (each person counted once); **expected count ≥ 5** in (at least about 80% of) cells. If expected counts are too small → combine categories or use **Fisher's exact test**.

---
id: stats-chisq-scenario
concept: Chi-square test
type: scenario
Q: You want to know whether take-up of flexible working differs by gender across 900 employees. Which test, and how would you report it?
A: **Chi-square test of independence**: both variables are categorical (took up flexible working yes/no × gender).

Report:
- the **percentages** in each group, because stakeholders understand these
- $\chi^2$, degrees of freedom and the **p-value**
- an **effect size** (e.g. Cramér's V)
- the caveat: association ≠ cause. It may reflect role type, caring responsibilities or eligibility, so consider those variables next.

Treat gender as **personal data** and check that the group sizes are large enough to avoid identifying individuals.

---
id: stats-pearson
concept: Correlation
type: definition
Q: What does **Pearson's correlation coefficient** $r$ measure, and how do you interpret it?
A: The **strength and direction of a linear relationship** between two continuous variables.

- Range: $-1$ to $+1$. $+1$ = perfect positive, $-1$ = perfect negative, $0$ = no **linear** relationship.
- A rough guide to strength: about 0.1 weak, 0.3 moderate, 0.5+ strong (this depends on the field).

Cautions: it only captures **linear** patterns, so always look at a **scatter plot**. It's sensitive to outliers. And it says nothing about cause.

---
id: stats-r2
concept: Correlation
type: definition
Q: What does $r^2$ (the **coefficient of determination**) tell you?
A: The proportion of the **variation** in one variable that is explained by its linear relationship with the other (or by the regression model).

Example: $r = 0.6$ → $r^2 = 0.36$ → about **36%** of the variation in engagement is explained by, e.g., manager rating. **64%** is due to other factors.

Useful for stakeholders: an $r$ of 0.6 sounds high, but it leaves most of the variation unexplained.

---
id: stats-causation
concept: Correlation vs causation
type: pitfall
Q: Sites with more training hours have lower staff turnover (r = −0.5). Can you say training reduces turnover? Why or why not?
A: **No, not from correlation alone.** Possible explanations:
- **Confounding variable**: e.g. better-resourced sites or better managers lead to *both* more training *and* lower turnover.
- **Reverse causation**: stable sites have time to train people, so low turnover causes more training.
- **Chance**, especially with few sites.

To get closer to causation: controlled comparisons or pilots (ideally randomised), before/after with a comparison group, or controlling for confounders in a regression. Report it as an **association** worth investigating.

---
id: stats-test-choice-flow
concept: Choosing a test
type: when
Q: Give a quick decision guide for choosing a statistical test.
A: Ask three questions:
1. **What's the question?** Difference between groups, or relationship between variables?
2. **What type of data?** Categorical, ordinal or continuous?
3. **How many groups, and are they independent or paired?**

| Situation | Test |
|---|---|
| 2 categorical variables | Chi-square |
| Continuous, one group vs a target | One-sample t-test |
| Continuous, 2 independent groups | Independent t-test (Welch's) |
| Continuous, same people twice | Paired t-test |
| 2 continuous variables | Pearson's r |

---
id: stats-scn-remote
concept: Choosing a test
type: scenario
Q: You want to know whether average annual sick days differ between **remote** and **office-based** staff (about 300 in each group). The data are right-skewed. Which test, and why?
A: **Two independent groups, continuous outcome.**

- An **independent t-test (Welch's)** is defensible: with ~300 per group, the **CLT** makes the sampling distribution of the mean approximately normal despite the skew.
- Because of the skew, also compare the **medians**. If the medians tell the same story as the means, your conclusion is more robust. If they don't, a few extreme absences are driving the difference, and you should say so.

Also report the **IQRs**, an **effect size**, and the caveat that remote vs office status may be confounded with role type.

---
id: stats-scn-tenure
concept: Choosing a test
type: scenario
Q: Is length of service related to engagement score (an average of 10 Likert items, 0–100)? Which test, and what would you check first?
A: A **correlation**: both variables are numeric, and the question is about a relationship.

- First draw a **scatter plot**: is it linear? Any outliers? Tenure is usually right-skewed.
- If linear and reasonably well-behaved → **Pearson's r**.
- If curved (e.g. engagement dips after year one then recovers), Pearson's r will **understate** the relationship. Describe the pattern from the chart, or compare tenure bands instead.

Report the coefficient, p-value and $r^2$, and remember: relationship ≠ cause.

---
id: stats-justify-test
concept: Choosing a test
type: justify
distinction: yes
ksb: K13, S10
Q: **Distinction (K13/S10):** "Justify your choice of inferential test given the data and proposed hypotheses, presenting possible alternatives." Give a model answer structure.
A: 1. **Hypotheses**: state $H_0$ and $H_1$ in business terms.
2. **Data**: variable types, groups (independent or paired), sample sizes, distribution.
3. **Test and why**: "Because I was comparing a continuous outcome across two independent groups with large samples, I used Welch's t-test."
4. **Assumptions checked**: normality and variances, and how you checked them.
5. **Alternatives**: "I considered turning the outcome into yes/no (e.g. above or below target) and using chi-square, but that would throw away information, so the t-test was the stronger choice."
6. **Alpha and why** (link to risk).
7. **Result → business meaning → limitations.**

The distinction markers are **reasoning**, **alternatives** and **implications**, not just naming the test.

---
id: stats-inf-use
concept: Inferential statistics
type: justify
distinction: yes
ksb: K13
Q: **Distinction (K13):** "Explain how inferential statistics are used at work to provide information about a population from a sample." Give a generic People/HR example.
A: Example: a pulse survey of **500 of 3,000 staff** shows 62% feel their workload is manageable.
- **Point estimate**: 62% is our best estimate for all staff.
- **Confidence interval**: roughly ±4 percentage points at 95% → likely between about 58% and 66% for the whole workforce (this ignores non-response bias).
- **Hypothesis test**: is this different from last year's 67%? Use a test of proportions or chi-square.
- **Caveats**: inference assumes a **representative sample**, so check the respondent profile against HR data.

Value: leaders can act on the whole-workforce picture without surveying everyone, and they know how much uncertainty there is.

---
id: stats-prop-ci
concept: Confidence interval
type: formula
Q: Give the formula for a **95% confidence interval for a proportion**, and apply it to 62% of 500 respondents.
A: $$\hat{p} \pm 1.96\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$$

$$0.62 \pm 1.96\sqrt{\frac{0.62 \times 0.38}{500}} = 0.62 \pm 1.96 \times 0.0217 = 0.62 \pm 0.043$$

→ **57.7% to 66.3%**, i.e. about **±4 percentage points**.

This simple (Wald) method works for large samples with proportions not too near 0% or 100%.

---
id: stats-simpson
concept: Simpson's paradox
type: pitfall
Q: What is **Simpson's paradox**? Give an HR-style example.
A: A trend that appears in **every subgroup** can **reverse or vanish when the groups are combined**, because the groups differ in size or composition.

Example: in *every* department, women are promoted at a slightly higher rate than men. But overall, women's promotion rate looks lower, because more women work in departments with low promotion rates for everyone.

Lesson: check whether an overall comparison is **confounded by group mix**, and break results down before concluding.
