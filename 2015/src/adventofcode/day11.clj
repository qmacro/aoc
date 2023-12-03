(ns adventofcode.day11
  (:require [clojure.string :as str]))

"Basic setup stuff."
(def not-nil? (complement nil?))
(def lowercase-a 97)
(def startstring "cqjxjnds")


(defn to-digits
  "Converts a number n to a representation in a different base b."
  [n b]
  (loop [n n
         digits ()]
    (if (pos? n)
      (recur (quot n b)
             (conj digits (mod n b)))
      digits)))


(defn base-powers
  "A list of n base powers starting at 1.
  e.g. for base 2: [1,2,4,8,16...]."
  [base n]
  (cons 1
        (->>
          (repeat base)
          (take (dec n))
          (reductions *))))


(def base26-powers
  "A list of the first eight base 26 powers."
  (base-powers 26 8))

(def lettermap
  "A map of letters (a,b,c...) to values (0,1,2...)."
  (into {}
        (zipmap
          (map char (range lowercase-a (+ 26 lowercase-a)))
          (range))))

(defn alpha-to-decimal
  "Convert alpha to decimal:
  - reverses the alpha sequence (so units first)
  - looks up the values for each letter
  - multiplies each value by the corresponding power
  - sums the results"
  [alpha]
  (let [charseq (reverse alpha)]
    (->>
      (map lettermap charseq)
      (map * base26-powers)
      (reduce +))))


(defn value-to-letter
  "Converts a value to its letter equivalent.
  e.g. 0 -> a, b -> 2, etc"
  [value]
  (char (+ lowercase-a value)))


(defn next-string
  "Given a string, return the next in sequence.
  e.g. abc -> abd, or erzz -> esaa"
  [string]
  (->>
    (-> (alpha-to-decimal string)
        (inc)
        (to-digits 26))
    (map value-to-letter)
    (apply str)))


(def straights
  "A generated list of 3-char straights.
  i.e. abc,bcd,cde etc"
  (->> (partition 3 1 (range 26))
       (map #(apply str (map value-to-letter %)))))


(def straights-pattern
  "A regex pattern looking for any of the straights."
  (re-pattern (str \( (clojure.string/join \| straights) \))))

"Checks"
(defn check-straight-ok
  "Password requirement: Must have at least one straight."
  [string]
  (not-nil? (re-find straights-pattern string)))

(defn check-oil-ok
  "Password requirement: May not have any of the letters o, i or l."
  [string]
  (nil? (re-find #"[oil]" string)))

(defn check-double-letter-ok
  "Password requirement: Must have at least 2 double letter pairs."
  [string]
  (< 1 (->> (re-seq #"(\w)\1" string) (map first) set count)))


(defn find-next
  "Given a password, find the next one"
  [current]
  (loop [s current
         i 0]
    (if (and (check-straight-ok s)
             (check-oil-ok s)
             (check-double-letter-ok s))
      s
      (do
        (recur (next-string s) (inc i))))))

(defn solve
  "..."
  [& args]
  (let [in (->> "resources/day11input" slurp str/trim-newline)]
    (let [next (find-next in)]

      ;; Part 1
      (println next)

      ;; Part 2
      (println (find-next (next-string next)))

      )))
