export const nonBudgetNote = "These can bear more weight than the budget picks, and can run continuously for much longer. They're quieter, and they're likely to need less servicing. However, I can't in good faith recommend these, given I haven't needed to service my budget mills after 2 years; I contend that the budget picks are less an issue of quality; and more an issue of using them wisely, like non-continuous use."

export const budgetNote = "For lowest price mills, I recommend DeerRun instead. All the ultra-budget mills last around a year (at 40hrs / week). So if you're just testing the waters, prioritize cost (DeerRun); and if you want more value, upgrade to my mid-tier recommend. For Urevo budget mills, below are best price, no incline (except E3), less durable (but still very good). E3 has incline, but is very old and lacks shock absorption and motor venting. So I recommend E5 with a 2x4 under the head."

const info = {
  urevo: {
    name: "Urevo",
    // overriden in each item
    warranty: {
      value: ["Amazon", "Urevo"],
      notes: () => <div>Amazon for peace of mind, but Urevo's is free and 2 years. Tough call.</div>
    },
    rating: 8,
    notes: () => <div>
      Urevo has the best value (price-to-quality ratio) of my research & testing. Eg, compared to Egofit M2 - they're available on Amazon, with extended warranty, cheaper, less sensitive to pet-hair, for otherwise same quality. They're the default choice by some package deals (like FlexiSpot walking desks). I recommend the Urevo 3S for mid-tier, CyberPad for quality. Their other models have some combination of good price, shock absorption, incline, good motor; but rarely all together. Expand other sections to compare. Note: their prices fluctuate, and there's often an Amazon Coupon (right under the price), check before buying.

      <h4>Choosing the right model</h4>
      <div>
        There are multiple options, each with trade-offs. Budget = SpaceWalk E; Mid = SpaceWalk S; Quality = Strol & CyberPad
      </div>
      <ol>
        <li>
          <h5>
            <a href="https://shareasale.com/r.cfm?b=2635321&u=4069700&m=159466&urllink=www%2Eurevo%2Ecom%2Fcollections%2Funder%2Ddesk%2Dtreadmill%3Fsort%5Fby%3Dcreated%2Ddescending&afftrack=blog" target="_blank">Go to their website</a>, sort by Date: new-&gt;old.
          </h5>
          <div><small>Their website is easier to compare models than Amazon. Newer models are better, since Urevo iterates fast based on user complains. Eg, the SpaceWalk E3 had motor heat complaints; so they improved that with E4; then again with E5 (adding vents).</small></div>
        </li>
        <li>
          <h5>Find one based on needs</h5>
          <div><small>Spacewalks are the budget options; "S" models are the mid-range; and Strols allow running (max speeds around 7.5mph).</small></div>
        </li>
        <li>
          <h5>Then copy/paste the model name into Amazon</h5>
          <div><small>Some of the newest models aren't there yet; but most the others are. Then you can get the Asurion extended warranty and all that. They don't name them on Amazon, so cross-reference the image from what you chose on urevo.com.</small></div>
        </li>
      </ol>
    </div>
  },
  egofit: {
    name: "Egofit",
  },
  lifespan: {
    name: "LifeSpan",
    link: "https://www.lifespanfitness.com/pages/treadmill-desks#treadmillDesk",
    rating: 5,
    warranty: {},
    notes: () => <>
      <div>{nonBudgetNote}</div>
      Each iteration is just an upgrade of the one before it. So just pick whichever price point you're most comfortable with. They're also increasingly heavy / large, and accommodate increasing weight. So factor that into your decision. Note: I'm not sure what the difference between the models GlowUp, Classic, Power, and Omni. I think the GlowUp means "just the treadmill" where the other ones are different spins on the "and also the desk" - but you'll want to research some.</>
  },
  imovr: {
    name: "iMovR",
    rating: 5,
    warranty: {},
    notes: () => <div>{nonBudgetNote}</div>
  }
}
export default info;